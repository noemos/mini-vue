//可以创建一个类来获取value值
import {isTracking, track, trackEffects, triggerEffects} from "./effect";
import {hasChanged, isObject} from "../shared";
import {reactive} from "./reactive";
class RefImpl{
    private _value: any;
    public dep;
    //这里的dep只有一个value值即可
    private _rawValue: any;
    public __v_isRef = true;
    constructor(value) {
        this._rawValue = value
        this._value = convert(value);
        //判断value是不是对象,如果是对象的话就要用reactive来进行包裹，不是对象的话就要返回一个value值
        this.dep = new Set();
    }
    get value(){
        //这里要先判断
        trackRefValue(this)
        return this._value;
    }
    set value(newValue){
        //hasChanged
        //问题
        if (hasChanged(newValue,this._rawValue)){
            this._rawValue = newValue
            this._value = convert(newValue);
            triggerEffects(this.dep);
        }
    }
}
function trackRefValue(ref){
    if (isTracking()){
        trackEffects(ref.dep);
    }
}
function convert(value){
    return isObject(value)?reactive(value):value
}
//ref里面要返回的是一个value值
export function ref(value){
    return new RefImpl(value)
}
//判断isRef
export function isRef(ref){
    return !!ref.__v_isRef;
}
export function unRef(ref){
    // 判断是不是ref对象，如果是ref对象，返回ref.value
//    不是就返回ref
    return isRef(ref)?ref.value:ref
}
export function proxyRefs(objectWithRef){
    return new Proxy(objectWithRef,{
        get(target,key){
            return unRef(Reflect.get(target,key))
        },
        set(target,key,value){
            if (isRef(target[key]) && !isRef(value)){
                return target[key].value = value;
            }else {
                return Reflect.set(target,key,value)
            }
        }

    })

}
