import System from "../../../ecs/systems/System";
import TaskFollowPath from "../../../tasks/implementations/TaskFollowPath";
import TaskPathFind from "../../../tasks/implementations/TaskPathFind";
import TaskTravelTo from "../../../tasks/implementations/TaskTravelTo";
import TaskFindItem from "../../../tasks/implementations/TaskFindItem";
import { Query, QueryLocality } from "../../../querys/QueryExecutor";
import TaskCollectAll from "../../../tasks/implementations/TaskCollectAll";
import TaskPickUp from "../../../tasks/implementations/TaskPickUp";
import Marker from "../../overlays/Marker";

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

    // Task CollectAll(food)
    // - if entity.queryResult && entity.queryRequest is null -> entity.task = TaskFindItem(food)
    // - elif entity.queryResult has food && entity.at(food) -> queryResult = null && entity.task = PickUp(food)
    // - elif entity.queryResult has food && !entity.at(food) -> entity.task = TravelTo(food)
    // - elif entity.queryResult no food -> entity.task = entity.task.parent;

    // Task PickUp(food)
    // - entity.pickUpTarget -> delete component && entity.task = entity.task.parent;

    // Task FindItem(food)
    // - if entity.itemLocation -> entity.tast = entity.task.parent
    // - elseif !entity.itemLocation -> entity.itemSearchType = food // other sys will fullfill

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
                case TaskCollectAll:
                    this._handleCollectAll(taskComp);
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

    _handleCollectAll = (taskComp) => {
        // Task PickUpAll(food)
        // - if entity.queryResult is null && entity.queryRequest is null -> entity.task = TaskFindItem(food)
        // - elif entity.queryResult has food && entity.at(food) -> queryResult = null && entity.task = PickUp(food)
        // - elif entity.queryResult has food && !entity.at(food) -> entity.task = TravelTo(food)
        // - elif entity.queryResult no food -> entity.task = entity.task.parent;
        const queryComp = this._entityManager.getComponent('query', taskComp.id);
        if (queryComp.queryResult === null) {
            const selfKinematic = this._entityManager.getComponent('kinematic', taskComp.id);
            taskComp.task = new TaskFindItem(taskComp.task, new Query(
                taskComp.task.taskData.collectCompType,
                taskComp.task.taskData.collectCompTypePredicate,
                QueryLocality.FARTHEST,
                selfKinematic.position
            ));
        } else if (queryComp.queryResult !== null) {
            if (queryComp.queryResult.found === 1) { // has food
                const foundPosition = queryComp.queryResult.kinematic.position;
                const selfPosition = this._entityManager.getComponent('kinematic', taskComp.id).position;
                const distance = selfPosition.distanceTo(foundPosition);
                if (distance < 0.01) { // at(food) = true
                    taskComp.task = new TaskPickUp(taskComp.task, queryComp.queryResult.comp.id);
                    queryComp.queryResult = null;
                } else { // at(food) = false
                    taskComp.task = new TaskTravelTo(taskComp.task, foundPosition); 
                }
            } else if(queryComp.queryResult.found === 0) { // no food
                taskComp.task = taskComp.task.parent;
            }
        } 
    }

    _handlePickUp = (taskComp) => {
        // Task PickUp(food)
        // - entity.pickUpTarget -> delete component && entity.task = entity.task.parent;
        const deleteTarget = taskComp.task.taskData.eid;
        this._entityManager.removeAllEntityComponents(deleteTarget);
        taskComp.task = taskComp.task.parent;
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