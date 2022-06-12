
class ReactiveEffect{
    private _fn :any;

    constructor(fn) {
        this._fn=fn;
    }
    run(){
        activeEffect = this;
        this._fn();
    }
}
const targetMap = new Map();
export function track(target,key){
    let depsMap = targetMap.get(target);
    if (!depsMap){
        //初始化一个depsmap
        depsMap = new Map();
        targetMap.set(target,depsMap);
    }
    let dep = depsMap.get(key);
    if (!dep){
        dep = new Set();

    }
    dep.push(activeEffect);
}
//创建一个全局变量
let activeEffect;
export function effect(fn){
//   创建一个函数fn
    const _effect = new ReactiveEffect(fn);
    _effect.run();
}