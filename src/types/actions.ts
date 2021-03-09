/**
 * action 是一个普通的对象 用于改变意图，必须包含属性type
 * 常常配合actionCreators生成action
 */
export interface Action<T = any> {
  type: T
}


export interface AnyAction extends Action {
  // 允许额外的属性定义在action上，也就是payload，真正驱动视图的data
  [extraProps: string]: any
}

/* action creators */

export interface ActionCreator<A, P extends any[] = any[]> {
  (...args: P): A
}

export interface ActionCreatorsMapObject<A = any, P extends any[] = any[]> {
  [key: string]: ActionCreator<A, P>
}
