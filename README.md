# Kingsim

Browser based kingdom simulation.

Uses React, Three-js, and ECS architecture to simulate a small browser kingdom.

Personal project for testing out new ideas.

## ECS (Entity Component System)
Entity - IDs that tie Components together. Ex.) Arrow, Unit, House, Tree

Component - Data / State of an entity. Ex.) Location, Health, Mesh

System - Read and Act on Component groups. Ex.) Render all Meshes at their entity location