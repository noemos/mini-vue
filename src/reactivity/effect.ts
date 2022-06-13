
class ReactiveEffect{
    private _fn :any;

    constructor(fn) {
        this._fn=fn;
    }
    run(){
        activeEffect = this;
        return this._fn();
    }
}
const targetMap = new Map();
export function track(target,key){
    let depsMap = targetMap.get(target);
    if (!depsMap){
        //初始化一个depsmap
        depsMap = new Map();
        //存储
        targetMap.set(target,depsMap);
    }
    let dep = depsMap.get(key);
    if (!dep){
        dep = new Set();
        depsMap.set(key,dep)

    }
    dep.add(activeEffect);
}
export function trigger(target,key){
//   基于target和key去收集前面所遍历的depsmap对象和dep对象，去收集前面
    let depsMap = targetMap.get(target)
    let dep = depsMap.get(key)
    for (const effect of dep){
        effect.run();
    }

}
//创建一个全局变量
let activeEffect;
export function effect(fn){
//   创建一个函数fn
    const _effect = new ReactiveEffect(fn);
    _effect.run();
    return _effect.run.bind(_effect)
}