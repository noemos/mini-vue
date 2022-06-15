import {track, trigger} from "./effect";
import {ReactiveFlags, readonly} from "./reactive";

const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true)
function createGetter(isReadOnly=false){
    return function get(target,key){
        if (key===ReactiveFlags.IS_REACTIVE){
            return !isReadOnly
        }else if(key===ReactiveFlags.IS_READONLY){
            return isReadOnly
        }
        //    foo
        const res = Reflect.get(target,key);
        //todo收集依赖
        if (!isReadOnly){
            track(target,key)
        }
        return res;
    }
}
function createSetter(){
    return function set(target,key,value){
        const res = Reflect.set(target,key,value);
        //    todo触发依赖
        trigger(target,key)
        return res
    }

}

export const mutableHandlers={
    get,
    //利用缓存来优化
    set,
}
export const readOnlyHandlers={
    get:readonlyGet,

    set(taget,key,value){

        console.warn(`key:${key} set失败 因为target是readonly`,taget)
        return true
    }
}