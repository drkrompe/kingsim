# Queries
Kicked off by the task system, the idea being that each `entity` might have a series
of `QueryComponents`. These components all align in that they have properties:

- `QueryRequest` [null || QueryObject]
- `QueryResult` [null || QueryResult]

Goal is to provide some kind of world information in the time space of a `tick`.

# How it works with ECS
`QuerySystem`'s will look up components with related `Query` and will use QueryExecutor
to fullfill that request. Upon execution should replace `QueryRequest` with `null`, and
fill `QueryResult` param.

Example:

Given Systems
```
QuerySystem
```

Tick 1
```
Entity
    - QueryComponent
        - QueryRequest = QueryRequest(FindLocationNearestFoodInRelationToMe)
        - QueryResult = null
```

Tick 2
```
Entity
    - QueryComponent
        - QueryRequest = null
        - QueryResult = QueryResult(NearestFoodLocation)
```