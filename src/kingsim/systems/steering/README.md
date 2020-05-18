# Steering behaviors / Systems
Operate on Kinematic data / components.

They return accelerations that change velocities

## Output
``` c
struct SteeringOutput:
    linear # a 2 or 3D vector
    angular # a single floating point value
```