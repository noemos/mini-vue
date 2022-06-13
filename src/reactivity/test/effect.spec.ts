import {reactive} from "../reactive";
import {effect} from "../effect";
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
        let foo = 10;
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
});