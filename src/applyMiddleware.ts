import compose from './compose'
import { Middleware, MiddlewareAPI } from './types/middleware'
import { AnyAction } from './types/actions'
import {
  StoreEnhancer,
  Dispatch,
  PreloadedState,
  StoreEnhancerStoreCreator
} from './types/store'
import { Reducer } from './types/reducers'


/**
 * const enhancer = composeEnhancers(applyMiddleware(thunk));
 * const store = createStore(reducer,enhancer);
 * export default store;
 */

// 以上面为案例

// createStore获取两个参数 第一个为reducer，第二个为enhancer（中间件）
// 在createStore中 直接将createStore的方法传递给中间件 并且把reducer preloadedState作为闭包参数执行 createStore.ts line97
// 来到本文件 line:80
// 创建一个Store
// 构建middlewareAPI参数 map所有中间件 传递middlewareAPI给中间件
// 然后就是经典的compose的闭包操作 类似ethan-ui的compose高阶组件操作

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param middlewares The middleware chain to be applied.
 * @returns A store enhancer applying the middleware.
 *
 * @template Ext Dispatch signature added by a middleware.
 * @template S The type of the state supported by a middleware.
 */
export default function applyMiddleware(): StoreEnhancer
export default function applyMiddleware<Ext1, S>(
  middleware1: Middleware<Ext1, S, any>
): StoreEnhancer<{ dispatch: Ext1 }>
export default function applyMiddleware<Ext1, Ext2, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 }>
export default function applyMiddleware<Ext1, Ext2, Ext3, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>,
  middleware3: Middleware<Ext3, S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 & Ext3 }>
export default function applyMiddleware<Ext1, Ext2, Ext3, Ext4, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>,
  middleware3: Middleware<Ext3, S, any>,
  middleware4: Middleware<Ext4, S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 & Ext3 & Ext4 }>
export default function applyMiddleware<Ext1, Ext2, Ext3, Ext4, Ext5, S>(
  middleware1: Middleware<Ext1, S, any>,
  middleware2: Middleware<Ext2, S, any>,
  middleware3: Middleware<Ext3, S, any>,
  middleware4: Middleware<Ext4, S, any>,
  middleware5: Middleware<Ext5, S, any>
): StoreEnhancer<{ dispatch: Ext1 & Ext2 & Ext3 & Ext4 & Ext5 }>
export default function applyMiddleware<Ext, S = any>(
  ...middlewares: Middleware<any, S, any>[]
): StoreEnhancer<{ dispatch: Ext }>
export default function applyMiddleware(
  ...middlewares: Middleware[]
): StoreEnhancer<any> {
  return (createStore: StoreEnhancerStoreCreator) => <S, A extends AnyAction>(
    reducer: Reducer<S, A>,
    preloadedState?: PreloadedState<S>
  ) => {
    const store = createStore(reducer, preloadedState)
    let dispatch: Dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }

    const middlewareAPI: MiddlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    // dispatch 去到 compose.ts line57
    dispatch = compose<typeof dispatch>(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
