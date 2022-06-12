import {reactive} from "../reactive";
import {effect} from "../effect";


// 写一个核心的代码逻辑
describe('effect',()=>{
    it.skip("happy path", ()=>{
        const user = reactive({
            age:10,
        });
        let nextAge;
        effect(()=>{
            nextAge = user.age +1;
        });
        //触发的时候
        expect(nextAge).toBe(11);
//    update 触发依赖
        user.age++;
        expect(nextAge).toBe(12);
    });
});