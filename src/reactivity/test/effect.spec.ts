import {reactive} from "../reactive";
import {effect,stop} from "../effect";
import {run} from "jest";


// 写一个核心的代码逻辑
describe('effect',()=>{
    it("happy path", ()=>{
        const user = reactive({
            age:10,
        });
        let nextAge;
        effect(()=>{
            nextAge = user.age +1;
        });
        //触发的时候
        expect(nextAge).toBe(11);
   // update 触发依赖
        user.age++;
        expect(nextAge).toBe(12);
    });
//    实现runner，当用户调用effect函数的时候，返回一个runner函数
    it('should return runner when call effect', ()=> {
    //    effect(fn) function(runner) fn return 调用runner会拿到fn返回的值
        let foo = 10;//
        const runner = effect(()=>{
            foo++;
            return "foo";

        });
        expect(foo).toBe(11);
        const r = runner();
        //验证内部的函数有没有执行，以及验证r有没有对应的返回值
        expect(foo).toBe(12);
        expect(r).toBe("foo")


    });
//    实现effect里面的scheduler功能
    it('scheduler',  ()=> {
        let dummy;
        let run:any;
        const scheduler = jest.fn(()=>{
            run = runner
        });
        const obj = reactive({foo:1});
        const runner = effect(()=>{
            dummy = obj.foo;
        },
            { scheduler }
        );
        expect(scheduler).not.toHaveBeenCalled();
        expect(dummy).toBe(1);
    //   开始调用trigger
        obj.foo++;

        expect(scheduler).toHaveBeenCalledTimes(1)
        expect(dummy).toBe(1);
        run();
        expect(dummy).toBe(2)

    });
//    实现stop
    it('stop ',  ()=> {
        let dummy;
        const obj = reactive({prop:1});
        const runner = effect(()=>{
            dummy=obj.prop;
        });
        obj.prop=2;
        expect(dummy).toBe(2);
        stop(runner);
        // obj.prop=3;
        obj.prop++;
        expect(dummy).toBe(2);
        runner();
        expect(dummy).toBe(3)

    });
//    实现onstop
    it('onStop ', ()=> {
        const obj = reactive({
            foo: 1,
        });
        const onStop = jest.fn();
        let dummy;
        const runner = effect(
            () => {
                dummy = obj.foo;
            },
            {
                onStop,
            }
        );
        stop(runner);
        expect(onStop).toBeCalledTimes(1)
    });

});