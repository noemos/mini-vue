import {isReactive, reactive} from "../reactive";


//在这里实现reactive的单测
describe('reactive',()=>{
    it('happy path', ()=> {
        const original = {foo:1};
        const observed = reactive(original);
        expect(observed).not.toBe(original);
        expect(observed.foo).toBe(1);
        expect(isReactive(observed)).toBe(true)

    });
})