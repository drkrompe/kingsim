# Decision Making Systems
Page 293 Decision Making

### Input: knowledge that an character possesses
    - Internal: information that a character knows about self
        example: health, ultimate goals, what it was doing a couple secs ago.
    - External: information that a character knows about world around it.
        example: position of other characters, layout of level

 Internal Knowledge can vary wildly based on the needs and algorithms used.

### Ouput: Action Request
    - Can change request action that will change external state or internal state.
        - example: change opinion of player, change emotional state, change
        ultimate goal

External knowledge tends to be uniform


# Decision Trees
Given a set of knowledge, generate a corresponding action from a set of
possible actions.

## Random decisions
Trees that run every frame, and have a random element should remember
the result of the "coin flip" in order to stop jumping between the
two sub paths every other frame.