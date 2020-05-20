export default class StateMachine {
    constructor(initialState) {
        this.currentState = initialState;
        this.actions = [];
    }

    update() {
        const triggeredTransition = this.currentState.transitions.find(transition => {
            return transition.isTriggered()
        });

        if (triggeredTransition) {
            const targetState = triggeredTransition.getTargetState();
            
            this.actions.push(this.currentState.getExitAction());
            this.actions.push(triggeredTransition.getAction());
            this.actions.push(targetState.getEntryAction());
            
            this.currentState = targetState;
            return this.actions;
        } else {
            return this.currentState.getAction();
        }
    }
}