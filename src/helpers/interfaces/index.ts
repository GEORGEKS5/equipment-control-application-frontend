import { button } from "../types";

export interface IHeaderCell{
    name: string,
    localName: string,
    filterable?: boolean,
    visible?: boolean,
}

export interface IButton extends button{
    
};

export interface IMouseEvent extends EventTarget{
    currentTarget: {
        value: string | number | undefined,
        parentElement: HTMLElement,
    }
}

export interface IModelForm<T>{
    get selectedModel(): T 
    get visible(): boolean
    show(event: IMouseEvent, dataModel: T[]): void
    hide(): void
}