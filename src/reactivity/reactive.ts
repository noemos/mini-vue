import {track,trigger} from "./effect";
import {mutableHandlers, readOnlyHandlers, shallowReadonlyHandlers} from "./baseHandlers";

export const enum ReactiveFlags{
    IS_REACTIVE = "__v_isReactive",
    IS_READONLY = "__v_isReadonly"

}

export function reactive(raw){
    return createActiveObject(raw,mutableHandlers)
}
export  function  readonly(raw) {
    return createActiveObject(raw, readOnlyHandlers)

}
export function shallowReadonly(raw){
    return createActiveObject(raw,shallowReadonlyHandlers)

}
export  function  isReactive(value){
    //这里没有挂载key，所以将他转为布尔值
    return !!value[ReactiveFlags.IS_REACTIVE]
}
export function  isReadonly(value){
    return !!value[ReactiveFlags.IS_READONLY]

}
export function isProxy(value){
    return isReactive(value) || isReadonly(value)
}

function createActiveObject(raw:any,baseHandlers){
    return new Proxy(raw,baseHandlers)
}
