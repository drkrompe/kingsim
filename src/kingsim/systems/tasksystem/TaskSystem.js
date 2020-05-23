import System from "../../../ecs/systems/System";
import TaskFollowPath from "../../../tasks/implementations/TaskFollowPath";
import TaskPathFind from "../../../tasks/implementations/TaskPathFind";
import TaskTravelTo from "../../../tasks/implementations/TaskTravelTo";
import { PredicateSameEntityIdAs } from '../../../utils/CommonPredicates';
import TaskFindItem from "../../../tasks/implementations/TaskFindItem";

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
                case TaskFindItem:
                    this._handleTaskFindItem(taskComp, taskComp.id);
                    break;
                case TaskTravelTo:
                    this._handleTaskTravelTo(taskComp, taskComp.id);
                    break;
                case TaskPathFind:
                    this._handleTaskPathFind(taskComp, taskComp.id);
                    break;
                case TaskFollowPath:
                    this._handleTaskFollowPath(taskComp, taskComp.id);
                    break;
                default:
            }
        });
    }

    _handleTaskFindItem = (taskComp) => {
        // Task FindItem(item)
        // - if entity.findItemQuery.itemResult -> entity.task = entity.task.parent
        // - elseif !entity.findItemQuery.itemQuery -> entity.itemQuery = nearest food to self
        // TODO Implement
    }

    _handleTaskTravelTo = (taskComp) => {
        // Task TravelTo(location)
        // - if entity.at(location) -> entity.task = task.parent
        // - elseif !entity.path -> entity.task = PathFind(location)
        // - elseif path.length > 0 -> entity.task = FollowPath
        const kinematicComp = this._entityManager.getComponent('kinematic', taskComp.id);
        const toLocation = taskComp.taskData.to;
        if (kinematicComp.position.x === toLocation.x && kinematicComp.position.y === toLocation.y) {
            taskComp.task = taskComp.task.parent;
            return;
        }
        const pathComp = this._entityManager.getComponent('path', taskComp.id);
        if (pathComp.path === null) {
            taskComp.task = new TaskPathFind(taskComp.task, taskComp.taskData.to);
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
            return;
        }
        const pathFindComp = this._entityManager.getComponent('path-find', taskComp.id);
        if (pathFindComp.to === null) {
            pathFindComp.to = taskComp.taskData.to;
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