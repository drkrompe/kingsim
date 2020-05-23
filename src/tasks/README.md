# Tasks
So this is WIP

```
class Task
    def doTask(timeDelta):
        if done()
            return parent
        else if hasSubTasksThatNeedToBeDone()
            return subTask[thatNeedsToBeDone]
        else
            // we are a actionable task... do the thing
            return this
```

## Example: Simple Brain

```
Task SimpleBrain
    Task MaintainNeeds
        Task NeedToEatFood
            Task LocateItem(Food)
            Task TravelTo(item)
                Task PathFindTo(item)
                Task FollowPath(path)
                    Task SetAnimationTo(walk)
                    Task MoveToPoint(path[pt])
                    Task SetAnimationTo(previous)
            Task PickUpItem(item)
                Task SetAnimationTo(pickup)
                Task PutItemInInventory(item)
                Task SetAnimationTo(previous)
            Task UseInventoryItem(item)
        Task NeedToSleep
            Task LocationItem(ownedBed)
            Task TravelTo(item)
                Task PathFindTo(item)
                Task FollowPath(path)
                    Task SetAnimationTo(walk)
                    Task MoveToPoint(path[pt])
                    Task SetAnimationTo(previous)
            Task LayDownOn(item)
                Task GetItemActionPoint(item)
                    Task PathFindTo(actionPoint)
                    Task FollowPath(path)
                        Task SetAnimationTo(walk)
                        Task MoveToPoint(path[pt])
                        Task SetAnimationTo(previous)
                Task SetAnimationTo(laydown)
                Task Rest
                Task SetAnimationTo(GetUp)
```

# Pros
- Allows to use simple Tasks to accomplish complex tasks
- Seems to encourage code reuse at a glance

# Cons
- Task Construction might get complicated. Likely will need
  ever more complex factory classes to build the most complex behaviors?
- Interuptions can likely be solved by setting the current entity
  task to the interupt task, based on some event or input. Having
  the interupt task parent be the previous task? This simple solution
  does not quite work as there are some tasks like setting animation
  that are not quite interuptable... for example should we set the
  animation back to walking/standing? Also how can we be sure we
  can return to a FollowPath task if the PathFind is out of date
  and we are in a new location?
- Can this be built to incorporate nicely with ECS? Here it seems like
  we will have components that have behavior no? This can probably be
  split to have systems for individual tasks, with each task having
  its own component. Then we add and take away these components as 
  needed (When a current task is switched out)? Likely problems here.

# Leveraging ECS

Having a `Task` Component with have a matching `TaskSystem`
who's job is to add a matching `TaskActionComponent` to 
the entity to accomplish that task. When the `Task` is 
`done` then the TaskSystem removes the matching 
`TaskActionComponent` from the entity, and sets the
`Task` to of the Entity to be the parent of the current
task.

This will allow ECS to shine in writing `Systems` that
focus on accomplishing a task well.

`TaskSystem` should query the task given to see if it
has data that it asks for from the other component. for
example:

Given Systems
```
Systems:
    TaskSystem
    PathFindSystem
    FollowPathSystem
```

Tick 1
```
Entities:
    Entity (112)
        Kinematic
        Task ["pathfind", pointB]
```

Tick 2
```
Entities:
    Entity (112)
        Kinematic
        Task ["pathfind", pointB]
        PathFind(pointB)
```

Tick 3
```
Entities:
    Entity (112)
        Kinematic
        Task ["followPath"]
        Path [pt1, pt2, pt3] 
```

Tick 4
```
Entities:
    Entity (112)
        Kinematic
        Task ["followPath"]
        path [pt2, pt3]
```

Tick 5
```
Entities:
    Entity (112)
        Kinematic
        Task ["followPath"]
        path [pt3]
```

Tick 6
```
Entities:
    Entity (112)
        Kinematic
        Task ["followPath"]
        Path []
```

Tick 7
```
Entities:
    Entity (112)
        Kinematic
        Task ["Wander"]
```