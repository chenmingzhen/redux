// global全局声明  
// Symbol的observable处于提案中
// 重写SymbolConstructor的声明
// 点击进去Symbol的声明见SymbolConstructor的详情
// 这里对SymbolConstructor的声明进行拓展
declare global {
  interface SymbolConstructor {
    readonly observable: symbol
  }
}

// declare namespace Test{
//   export class Calc{
//     doSUm(limit:number):void
//   }
// }

const $$observable = /* #__PURE__ */ (() =>
  (typeof Symbol === 'function' && Symbol.observable) || '@@observable')()

export default $$observable