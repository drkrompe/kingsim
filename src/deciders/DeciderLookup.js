export default class DeciderLookup {

    static lookupTable = new Map([
        ['wretch', new Map(['jobAssign', () => { return [] }])]
    ]);

    static lookup(type, decisionType) {
        return this.lookupTable.get(type).get(decisionType);
    }
}