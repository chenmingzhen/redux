/**
 * @param obj The object to inspect.
 * @returns True if the argument appears to be a plain object.
 */
// 根据原型链判断是否为普通的对象
export default function isPlainObject(obj: any): boolean {
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}

/**
 * 
 * const a={Hello:"1",method:()=>{}}

const Person = function(name, age) {
    this.name = name;
    this.age = age
}

class State{
  proto="proto"
}

const p=new Person(1,2)

const state=new State()


console.log(isPlainObject(a))// true 普通对象

console.log(typeof p==='object') //true

console.log(typeof state==='object') //true 

console.log(isPlainObject(state)) // false 类对象

console.log(isPlainObject(p)) // false 函数对象
 * 
 */
