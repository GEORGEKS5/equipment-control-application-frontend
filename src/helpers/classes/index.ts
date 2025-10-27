import { IButton, IHeaderCell, IMouseEvent, IModelForm } from "../interfaces";
import { Ref, ref } from "vue"
import { button, TEquipment, formName, TEmployee, TConstructiveObject } from "../types";

export class TableHeaderCell implements IHeaderCell{
    name: string;
    localName: string;
    visible?: boolean;
    filterable?: boolean;

    constructor(name: string, localName: string,filterable?: boolean, visible?: boolean){
        this.name = name;
        this.localName = localName;
        this.visible = visible;
        this.filterable = filterable;
    }
}

export class TableButton implements IButton{
    emitEventName: string;
    valueParamName: string;

    constructor(valueParamName: string, emitEventName: string, public caption: string, public iconPath?: string){
        this.caption = caption;
        this.emitEventName = emitEventName;
        this.valueParamName = valueParamName;
        this.iconPath = iconPath;
    }
}

export class BasicForm{
    private _visibility: Ref<boolean>

    constructor(){
        this._visibility = ref(false);
    }

    get visible(){
        return this._visibility.value
    }

    hide(): void{
        this._visibility.value = false;
    }

    show(event?: IMouseEvent, dataModel?: any[]): void{
        this._visibility.value = true;
    }
}

abstract class AModelForm<T> extends BasicForm implements IModelForm<T>{
    protected _selectedModel: Ref<T>

    constructor(protected _defaultSelectModel: T){
        super();
        this._selectedModel = ref();
    }

    get selectedModel(): T {
        return this._selectedModel.value ?? this._defaultSelectModel;
    }

    public show(event: IMouseEvent, dataModel?: T[]): void {
        super.show();
        this.setSelectedModel(event, dataModel);
    }

    public hide(): void {
        super.hide();
        this._selectedModel.value = this._defaultSelectModel;
    }

    protected findSelectedModel(event: IMouseEvent, modelKeyName: keyof T, dataModel: T[]): T{
        let activeElement: T = dataModel?.find(val =>{
            return val[modelKeyName] === event.currentTarget.value;
        });

        if(!activeElement){
            this.logError(new Error(`Not match ${String(modelKeyName)} in DataModel. SelectedModel set empty model.`));
        }

        return activeElement ?? this._defaultSelectModel;
    }

    protected findIdentifierOnlySelectedModel(event: IMouseEvent, modelKeyName: keyof T): T{
        const val = event?.currentTarget?.value;

        if(!val){
            this.logError(new Error(`Event.currentTarget.value is undefined. Set ${String(modelKeyName)} default value`));
        }

        return {[modelKeyName]: typeof val === "string" ? val : ''} as T
    }

    protected abstract setSelectedModel(event: IMouseEvent, dataModel?: T[]): void 
    protected abstract logError(e: Error): void
}

export class EquipmentModelForm extends AModelForm<TEquipment>{
    public show(event: IMouseEvent, dataModel: TEquipment[]): void {
        super.show(event, dataModel);
    }
    
    protected logError(e: Error): void {
        console.error(e);
    }

    protected setSelectedModel(event: IMouseEvent, dataModel: TEquipment[]): void {
        this._selectedModel.value = this.findSelectedModel(event, "SerialNumber", dataModel);
    }
}

export class EmployeeModelForm extends AModelForm<TEmployee>{
    public show(event: IMouseEvent, dataModel: TEmployee[]): void {
        super.show(event, dataModel);
    }

    protected logError(e: Error): void {
        console.error(e);
    }

    protected setSelectedModel(event: IMouseEvent, dataModel: TEmployee[]): void {      
        this._selectedModel.value = this.findSelectedModel(event, 'UserName', dataModel);
    }
}

export class EmployeeIdentifierOnlyModelForm extends AModelForm<TEmployee>{
    protected logError(e: Error): void {
        console.error(e);
    }

    protected setSelectedModel(event: IMouseEvent): void {
        this._selectedModel.value = this.findIdentifierOnlySelectedModel(event, "UserName");
    }
}

export class EquipmentIdentifierOnlyModelForm extends AModelForm<TEquipment>{
    protected logError(e: Error): void {
        console.error(e);
    }

    protected setSelectedModel(event: IMouseEvent): void {
        this._selectedModel.value = this.findIdentifierOnlySelectedModel(event, "SerialNumber");
    }
}

export class ConstructiveObjectIdentifierOnlyModelForm extends AModelForm<TConstructiveObject>{
    protected logError(e: Error): void {
        console.error(e);
    }
    
    protected setSelectedModel(event: IMouseEvent, dataModel?: TConstructiveObject[]): void {
        this._selectedModel.value = this.findIdentifierOnlySelectedModel(event, "objectIdentificator");
    }
}

export class FilterForm extends BasicForm{
    private _filterCategory: Ref<string>
    static absoluteFormClientRect: Ref<DOMRect> 

    constructor(private _name: formName){
        super();
        this._filterCategory = ref('');
        this._name = _name;
        FilterForm.absoluteFormClientRect = ref();
    }

    set filterCategory(value: string){
        this._filterCategory.value = value;
    }

    get filterCategory(){
        return this._filterCategory.value
    }

    get name(){
        return this._name
    }
}

export class FilterFormVisibilityController{
    constructor(protected _activeForm: FilterForm, protected _filterFormSet?: FilterForm[]){
        this._filterFormSet = [];
    }

    get filterFormSet(){
        return this._filterFormSet;
    }

    get activeForm(){
        return this._activeForm;
    }

    protected checkUniqueFormName(testFormName: formName): boolean{
        const res: FilterForm = this._filterFormSet.find(val=>{
            return val.name === testFormName
        });

        return !Boolean(res);
    }

    protected checkActiveFormName(testFormName: formName): boolean{
        return Boolean(this.activeForm.name === testFormName)
    }

    public addFilterForm(formObject: FilterForm): void{
        const additingFormName = formObject.name;

        if(this.checkUniqueFormName(additingFormName)){
            if(!this.checkActiveFormName(additingFormName)){
                this._filterFormSet.push(formObject);
            }else{
                throw new Error('Imposible to add an active form');
            }
        }else{
            throw new Error('Imposible to add Ununique form name')
        }
    }

    protected hideUnactiveFormSet(){
        this._filterFormSet.forEach(form=>{
            form.hide();
        })
    }

    public showActiveForm(event: IMouseEvent): void{
        this.activeForm.show();
        this.hideUnactiveFormSet();
        const currentTarget = event.currentTarget;
        this.activeForm.filterCategory = typeof currentTarget.value === 'string' ? currentTarget.value : '';
        FilterForm.absoluteFormClientRect.value = currentTarget.parentElement.getBoundingClientRect();
    }
}