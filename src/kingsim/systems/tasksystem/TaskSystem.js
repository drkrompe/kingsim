import System from "../../../ecs/systems/System";

export default class TaskSystem extends System{
    systemTick(timeDelta) {
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
        // - if entity.path -> set entity task to task.parent
        // - else if !entity.pathFindTarget -> entity.pathFindTarget = pointB
        // - else do nothing
        
        // Task FollowPath
        // - if path is empty, set entity task to task.parent
        // - else do nothing
    }
}