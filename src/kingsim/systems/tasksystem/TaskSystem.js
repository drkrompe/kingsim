import System from "../../../ecs/systems/System";
import TaskFollowPath from "../../../tasks/implementations/TaskFollowPath";
import TaskPathFind from "../../../tasks/implementations/TaskPathFind";
import TaskTravelTo from "../../../tasks/implementations/TaskTravelTo";
import TaskFindItem from "../../../tasks/implementations/TaskFindItem";
import { Query, QueryLocality } from "../../../querys/QueryExecutor";
import TaskFindAllTravelToAndDo from "../../../tasks/implementations/TaskFindAllTravelToAndDo";
import TaskPickUp from "../../../tasks/implementations/TaskPickUp";
import Marker from "../../overlays/Marker";
import TaskBuild from "../../../tasks/implementations/TaskBuild";
import TaskBuildAndGather from "../../../tasks/implementations/TaskBuildAndGather";

export default class TaskSystem extends System {
    // How it works
    // Example:

    // Task OrcThinkin
    // - if enemy in range -> entity.task = Fight(enemy)
    // - elseif any stat < 50% -> entity.task = KeepStatsUp

    // Task KeepStatsUp
    // - if entitiy.stat.hunger < 50% 
    //     -> if !entity.itemLocation -> set entity.task = FindItem(food)
    //     -> elseif !entity.at(itemLocation) -> set entity.task = TravelTo(entity.itemLocation)
    // - else self.task = task.parent

    // Task PerformBuild(building)
    // if building isBuilt -> entity.setAnimation(previous) && entity.task = entity.task.parent
    // else -> entity.setAnimation = "build" && entity.setAnimation("build")

    // Task CollectAll(food) // See FindAllTravelToAndDo
    // - if entity.queryResult && entity.queryRequest is null -> entity.task = TaskFindItem(food)
    // - elif entity.queryResult has food && entity.at(food) -> queryResult = null && entity.task = PickUp(food)
    // - elif entity.queryResult has food && !entity.at(food) -> entity.task = TaskTravelTo(food)
    // - elif entity.queryResult no food -> entity.task = entity.task.parent;

    // Task PickUp(food)
    // - entity.pickUpTarget -> delete component && entity.task = entity.task.parent;

    // Task FindItem(food)
    // - if entity.itemLocation -> entity.tast = entity.task.parent
    // - elseif !entity.itemLocation -> entity.itemSearchType = food // other sys will fullfill

    // Task Build
    // - if building is built -> entity.task = entity.task.parent
    // - else -> setAnimation("building") && building.build(self.buildAmount)

    // Task TravelTo(location)
    // - if entity.at(location) -> entity.task = task.parent
    // - elseif !entity.path -> entity.task = PathFind(location)
    // - elseif path.length > 0 -> entity.task = FollowPath

    // Task PathFind(pointB)
    // - if entity.path -> entity.task = task.parent
    // - else if !entity.pathFindTarget -> entity.pathFindTarget = pointB
    // - else do nothing

    // Task FollowPath
    // - if path is empty -> entity.task = task.parent
    // - else do nothing
    systemTick(timeDelta) {
        const taskComps = this._entityManager.getComponents('task');
        taskComps.forEach(taskComp => {
            switch (taskComp.task.constructor) {
                case TaskBuildAndGather:
                    this._handleBuildAndGather(taskComp);
                    break;
                case TaskFindAllTravelToAndDo:
                    this._handleFindAllTravelToAndDo(taskComp);
                    break;
                case TaskBuild:
                    this._handleBuild(taskComp);
                    break;
                case TaskPickUp:
                    this._handlePickUp(taskComp);
                    break;
                case TaskFindItem:
                    this._handleTaskFindItem(taskComp);
                    break;
                case TaskTravelTo:
                    this._handleTaskTravelTo(taskComp);
                    break;
                case TaskPathFind:
                    this._handleTaskPathFind(taskComp);
                    break;
                case TaskFollowPath:
                    this._handleTaskFollowPath(taskComp);
                    break;
                default:
            }
        });
    }

    _handleBuildAndGather = (taskComp) => {
        // Task GatherAndBuild
        // if possibleBuildTarget -> entity.task = Task HandleFindAllTravelToAndDo(unfinishedbuildings, Task Build)
        // elif possibleGatherTarget -> entity.task = Task HandleFindAllTravelToAndDo(food, Task PickUp)
        // else -> entity.task = entity.task.parent
        const possibleBuildTarget = Array.from(this._entityManager.getComponents('building').values()).find(building => building.isBuilt !== true);
        const possibleFoodTarget = Array.from(this._entityManager.getComponents('typing').values()).find(typeComp => typeComp.typing === 'food');
        if (possibleBuildTarget !== undefined) {
            taskComp.task = new TaskFindAllTravelToAndDo(taskComp.task, "building", (buildingComp => buildingComp.isBuilt !== true), TaskBuild);
        } else if (possibleFoodTarget !== undefined) {
            taskComp.task = new TaskFindAllTravelToAndDo(taskComp.task, "typing", (typingComp => typingComp.typing === 'food'), TaskPickUp);
        } else {
            taskComp.task = taskComp.task.parent;
        }
    }

    _handleFindAllTravelToAndDo = (taskComp) => {
        // Task BuildUnfinishedBuildings
        // if entity.queryResult is null -> entity.task = FindItem(unfinishedBuilding)
        // elif entity.queryResult has building && entity.at(building) -> queryResult = null && entity.task = Build(building)
        // elif entity.queryResult has building && !entity.at(building) -> entity.task = TravelTo(building)
        // elif entity.queryResult no building -> entity.task = entity.task.parent;
        const queryComp = this._entityManager.getComponent('query', taskComp.id);
        if (queryComp.queryResult === null) {
            const selfKinematic = this._entityManager.getComponent('kinematic', taskComp.id);
            taskComp.task = new TaskFindItem(taskComp.task, new Query(
                taskComp.task.taskData.findCompType,
                taskComp.task.taskData.findCompTypePredicate,
                QueryLocality.NEAREST,
                selfKinematic.position
            ));
        } else if (queryComp.queryResult.found === 1) {
            const foundPosition = queryComp.queryResult.kinematic.position;
            const selfPosition = this._entityManager.getComponent('kinematic', taskComp.id).position;
            const distance = selfPosition.distanceTo(foundPosition);
            if (distance < 0.01) {
                taskComp.task = new taskComp.task.taskData.doTaskConstructor(taskComp.task, queryComp.queryResult.comp.id);
                queryComp.queryResult = null;
            } else {
                taskComp.task = new TaskTravelTo(taskComp.task, foundPosition);
                queryComp.queryResult = null;
            }
        } else {
            taskComp.task = taskComp.task.parent;
            queryComp.queryResult = null;
        }
    }

    _handlePickUp = (taskComp) => {
        // Task PickUp(food)
        // - entity.pickUpTarget -> delete component && entity.task = entity.task.parent;
        const deleteTarget = taskComp.task.taskData.eid;
        this._entityManager.removeAllEntityComponents(deleteTarget);
        taskComp.task = taskComp.task.parent;
    }

    _handleBuild = (taskComp) => {
        // Task Build
        // - if building is built -> entity.task = entity.task.parent
        // - else -> setAnimation("building") && building.build(self.buildAmount)
        const buildTarget = taskComp.task.taskData.eid;
        const buildingComp = this._entityManager.getComponent('building', buildTarget);
        if (buildingComp.isBuilt === true) {
            taskComp.task = taskComp.task.parent;
        } else {
            const selfBuilder = this._entityManager.getComponent('builder', taskComp.id);
            buildingComp.workProgress += selfBuilder.work;
        }
    }

    _handleTaskFindItem = (taskComp) => {
        // Task FindItem(item)
        // - if entity.query.queryResult -> entity.task = entity.task.parent
        // - elseif !entity.query.queryRequest -> entity.query = nearest food to self
        // - else do nothing
        const queryComp = this._entityManager.getComponent('query', taskComp.id);
        if (queryComp.queryResult !== null) {
            taskComp.task = taskComp.task.parent;
        } else if (queryComp.queryRequest === null) {
            queryComp.queryRequest = taskComp.task.taskData.query
        }
    }

    _handleTaskTravelTo = (taskComp) => {
        // Task TravelTo(location)
        // - if entity.at(location) -> entity.task = task.parent
        // - elseif !entity.path -> entity.task = PathFind(location)
        // - elseif path.length > 0 -> entity.task = FollowPath
        const kinematicComp = this._entityManager.getComponent('kinematic', taskComp.id);
        const toLocation = taskComp.task.taskData.to;
        const distance = kinematicComp.position.distanceTo(toLocation);
        if (distance < 0.01) {
            taskComp.task = taskComp.task.parent;
            return;
        }
        const pathComp = this._entityManager.getComponent('path', taskComp.id);
        if (pathComp.path === null) {
            taskComp.task = new TaskPathFind(
                taskComp.task,
                taskComp.task.taskData.to,
                kinematicComp.position
            );
            return;
        }
        if (pathComp.path) {
            taskComp.task = new TaskFollowPath(taskComp.task);
            return;
        }
    }

    _handleTaskPathFind = (taskComp) => {
        // Task PathFind(pointB)
        // - if entity.path -> entity.task = task.parent
        // - else if !entity.pathFindTarget -> entity.pathFindTarget = pointB
        // - else do nothing
        const pathComp = this._entityManager.getComponent('path', taskComp.id);
        if (pathComp.path !== null) {
            taskComp.task = taskComp.task.parent;
            window.debug.pathFind && pathComp.path.forEach(pt => {
                Marker.createAt(pt, 0x000000, 5000)
            });
            return;
        }
        const pathFindComp = this._entityManager.getComponent('path-find', taskComp.id);
        if (pathFindComp.to === null) {
            pathFindComp.to = taskComp.task.taskData.to;
            pathFindComp.from = taskComp.task.taskData.from;
            window.debug.pathFind && Marker.createAt(taskComp.task.taskData.from, 0xffffff);
            window.debug.pathFind && Marker.createAt(taskComp.task.taskData.to, 0xffff00);
            return;
        }
    }

    _handleTaskFollowPath = (taskComp, entityId) => {
        // Task FollowPath
        // - if path is empty -> entity.task = task.parent
        // - else do nothing
        const pathComp = this._entityManager.getComponent('path', taskComp.id);
        if (pathComp.path === null) {
            taskComp.task = taskComp.task.parent;
            return;
        }
    }
}