import Task from "../tasks/Task";

class UsedByMap {
    _usedByMap = new Map();

    addTaskUser = (usedEid, taskConstructorName, userEid) => {
        let usedEntityMap = this._usedByMap.get(usedEid);
        if (usedEntityMap === undefined) {
            usedEntityMap = new Map();
            this._usedByMap.set(usedEid, usedEntityMap);
        };
        let taskUsersSet = usedEntityMap.get(taskConstructorName);
        if (taskUsersSet === undefined) {
            taskUsersSet = new Set();
            usedEntityMap.set(taskConstructorName, taskUsersSet);
        }
        taskUsersSet.add(userEid);
    }

    removeTaskUser = (usedEid, taskConstructorName, userEid) => {
        this.getTaskUsers(usedEid, taskConstructorName).delete(userEid);
    }

    getTaskUsers = (usedEid, taskConstructorName) => {
        let usedEntityMap = this._usedByMap.get(usedEid);
        if (usedEntityMap === undefined) {
            return new Set();
        }
        let taskUsers = usedEntityMap.get(taskConstructorName);
        if (taskUsers === undefined) {
            return new Set();
        }
        return taskUsers;
    }

    getAllUsersOf = (usedEid) => {
        const users = new Set();
        const taskMap = this._usedByMap.get(usedEid)
        if (taskMap === undefined || taskMap.size === 0) {
            return users;
        }
        taskMap.forEach(taskUsersSet => {
            taskUsersSet.forEach(user => {
                users.add(user);
            });
        })
        return users;
    }

    removeUserFromAll = (userEid) => {
        this._usedByMap.forEach(taskUsersMap => {
            taskUsersMap.forEach(set => {
                set.delete(userEid);
            });
        });
    }

    removeUsed = (usedEid) => {
        this._usedByMap.delete(usedEid);
    }
}

const UsedByMapService = new UsedByMap();
export default UsedByMapService;