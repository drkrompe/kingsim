import GridOverlay from "./GridOverlay"

export default class BuildMode {

    static onBuildModeFuncs = [];

    static enter = () => {
        GridOverlay.toggleGrid();
    }

    static exit = () => {
        GridOverlay.toggleGrid();
    }

    static subscribeToBuildMode = (func) => {
        BuildMode.onBuildModeFuncs.push(func)
    }

    static unsubscribeFromBuildMode = (func) => {
        BuildMode.onBuildModeFuncs = BuildMode.onBuildModeFuncs.filter(otherFunc => otherFunc !== func);
    }
}