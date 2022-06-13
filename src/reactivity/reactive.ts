import {track,trigger} from "./effect";



export function reactive(raw){
    return new Proxy(raw,{
        get(target,key) {
        //    {foo:1}
        //    foo
            const res = Reflect.get(target,key);
            //todo收集依赖
            track(target,key)

            return res;
        },

        set(target,key,value){
            const res = Reflect.set(target,key,value);
        //    todo触发依赖
            trigger(target,key)
            return res
        }
    })
}