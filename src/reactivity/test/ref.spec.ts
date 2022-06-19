import {isRef, proxyRefs, ref, unRef} from "../ref";
import {effect} from "../effect";
import {reactive} from "../reactive";


describe("ref",()=>{
    it("happy path", ()=> {
        const a = ref(1)
        expect(a.value).toBe(1)

    });

    it("should be reactive", ()=> {
        const a = ref(1);
        let dummy;
        let calls = 0;
        effect(()=>{
            calls++;
            dummy = a.value;
        })
        expect(calls).toBe(1);
        expect(dummy).toBe(1);
        a.value = 2;
        expect(calls).toBe(2)
        expect(dummy).toBe(2)
    //   same value should not trigger
        a.value=2;
        expect(calls).toBe(2)
        expect(dummy).toBe(2)
    });
    it('should make nested properties reactive ',  ()=> {
        const a = ref({
            count:1,
        });
        let dummy;
        effect(()=>{
            dummy = a.value.count;
        })
        expect(dummy).toBe(1);
        a.value.count = 2;
        expect(dummy).toBe(2);

    });
    it('isRef ', ()=> {
         const a = ref(1);
         const user = reactive({
             age:1
         })
         expect(isRef(a)).toBe(true);
         expect(isRef(1)).toBe(false);
         expect(isRef(user)).toBe(false)
    });
    it('unRef ',  ()=> {
        const a = ref(1);
        expect(unRef(a)).toBe(1);
        expect(unRef(1)).toBe(1);
    });
    it("proxyRefs",()=>{
        const user = {
            age:ref(10),
            name:"xiao"
        };
        //通过get去调用，如果是访问age是(ref）类型那就返回的是.value
        //不是的话就直接返回本身的值
        const proxyUser = proxyRefs(user);
        expect(user.age.value).toBe(10);
        expect(proxyUser.age).toBe(10);
        expect(proxyUser.name).toBe("xiao")
        //判断他的set对象是不是ref类型，如果是ref类型的话，那就是可以.value
        proxyUser.age = 20;
        expect(proxyUser.age).toBe(20)
        expect(user.age.value).toBe(20)

        proxyUser.age = ref(10);
        expect(proxyUser.age).toBe(10)
        expect(user.age.value).toBe(10)

    })
})