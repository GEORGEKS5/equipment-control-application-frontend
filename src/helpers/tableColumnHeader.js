export default class TableColumnHeader{
    constructor(name, russifiedName, filterable = false, visible = true){
        this.name = name;
        this.localName = russifiedName;
        this.filterable = filterable;
        this.visible = visible;
    }
}