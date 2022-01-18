// function Component(id: number) {
//     console.log('init component');
//     return (target: Function) => {
//         console.log('run component');
//         target.prototype.id = id;
//     }
// }

// function Logger() {
//     console.log('init logger');
//     return (target: Function) => {
//         console.log('run logger');
//     }
// }
// function Method(
//     target: Object,
//     propertyKey: string,
//     propertyDescriprot: PropertyDescriptor,
// ) {
//     console.log(propertyKey);
//     propertyDescriprot.value = function (...args: any[]) {
//         for (let key of args) {
//             return key * 10;
//         }
//     }
// }

// function Prop(
//     target: Object,"**/vendor/*.js"
//     propertyKey: string,
// ) {
//     let value: number;

//     const getter = () => {
//         console.log(`get value - ${value}`);
//         return value;
//     }
//     const setter = (newValue: number) => {
//         console.log(`set new value - ${newValue}`)
//         value = newValue;
//         return value;
//     }
//     Object.defineProperty(target, propertyKey, {
//         get: getter,
//         set: setter,
//     });
// }

// function Param(
//     target: Object,
//     propertyKey: string,
//     index: number,
// ) {
//     console.log(propertyKey, index);
// }

// @Logger()
// @Component(11)
// class User {
//     @Prop id: number;

//     @Method
//     updateId(@Param newId: number) {
//         this.id = newId;
//         return this.id;
//     }
// }

// console.log(new User().id);
// console.log(new User().updateId(8));

// import 'reflect-metadata';

// function Inject(key: string) {
// 	return (target: Function) => {
// 		Reflect.defineMetadata(key, 1, target);
// 		const meta = Reflect.getMetadata(key, target);
// 		console.log(meta);
// 	};
// }
// function Prop(target: Object, propertyKey: string) {}

// @Inject('R')
// class SomeClass {
// 	@Prop prop: number;
// }
