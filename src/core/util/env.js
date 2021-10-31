/* @flow */

// can we use __proto__?
export const hasProto = '__proto__' in {}

// Browser environment sniffing
export const inBrowser = typeof window !== 'undefined'
// 判断是否在浏览器环境中运行
export const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
//判断是否是微信平台                                            !! 双重取反 是将一个数据转换成boolean类型
export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
// 获取到微信平台 
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
// 获取到微信浏览器导航信息
export const isIE = UA && /msie|trident/.test(UA)
// 判断是否是ie浏览器 
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
// 判断石否是ie9
export const isEdge = UA && UA.indexOf('edge/') > 0
// 判断是否是 isEdge
export const isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android')
// 判断是否是安卓
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')
// 判断是否是 ios
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
// 判断是否是 chrome
export const isPhantomJS = UA && /phantomjs/.test(UA)
// 无界面浏览器
export const isFF = UA && UA.match(/firefox\/(\d+)/)
//  火狐
// Firefox has a "watch" function on Object.prototype...
export const nativeWatch = ({}).watch

export let supportsPassive = false
if (inBrowser) {
  try {
    const opts = {}
    
    Object.defineProperty(opts, 'passive', ({
      get () {
        /* istanbul ignore next */
        supportsPassive = true
      }
    }: Object)) // https://github.com/facebook/flow/issues/285 
    // flow 检测这个对象是 Object类型 
    window.addEventListener('test-passive', null, opts)
   /* 
   AAAA
    addEventListener 第三个参数 
    设置为true或者false
      入果设置为true 表示 在捕获阶段执行该事件
      如果设置为false 表示 在冒泡阶段执行该事件
    设置为对象
      有三个参数
        capture :Boolean  如果是true  表示listener 会在该类型的事件捕获阶段传播到该 "eventTarget" 时触发
        once : Boolean   如果是 true  表示listener 添加之后只调用一次 listener 会在其被调用之后自动移除
        passive:Boolean 如果是true 表示listener 永远不会调用 preventDefault 如果listener 仍然调用了这个函数 客户端将会忽略它并抛出一个控制台警告
   */



    console.log("opts",opts)
  } catch (e) {}
}


// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
let _isServer
export const isServerRendering = () => {
  
  if (_isServer === undefined) {
    /* istanbul ignore if */
    // 初次运行此程序
    // 判断是否是在服务器端nodeJS 环境,
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // !inBrowser 表示不是在浏览器环境中 global !== "undefined" 代表是在nodeJs 中,而不是在 worker中
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server'
      // 将server 字符串赋值给 isServer变量和顶层 global下的属性process

    } else {
      // 运行环境不是node 的服务器
      _isServer = false
    }
  }
  return _isServer
}

// detect devtools

export const devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__
// 输出Vue的工具方法的全局钩子

/* istanbul ignore next */
export function isNative (Ctor: any): boolean {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
  // 判断方法是否是JavaScript 内置的方法 
    // 比如 Function Object ExpReg window  document 等等  这些方法使用c 或者 c++ 实现
}
export const hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys)
// 判断环境 是否支持 es6中的 symbol和reflect 利用了上边的 isNative
let _Set
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  // AAAA
  _Set = class Set implements SimpleSet {
    /* 
      implements
        显示地强制一个类满足一个契约 
        关键字 implements
    
    
    
    */
    set: Object;
    constructor () {
      this.set = Object.create(null)
      /* 
        Object.create 
          创建一个新的对象,使用现有对象来提供新创建对象的proto 
        Object.create(null)
          创建一个空对象,该对象上没有继承 Object.prototype 原型链上的属性或者方法, 例如 toString() hasOwnProperty
      */
    }
    has (key: string | number) {
      // 类的方法 入参 可以是 string 或者 number 类型
      return this.set[key] === true
    }
    add (key: string | number) {
      this.set[key] = true
    }
    clear () {
      this.set = Object.create(null)
      // 清空的时候 使用 Object.create(null)
    }
  }
}

export interface SimpleSet {
  // interface 表示 一个接口 约束
  has(key: string | number): boolean;
  // j接口定义 has 方法的形参的 key 可以是 string或者 number类型 返回值是 boolean类型
  add(key: string | number): mixed;
  // 接口定义 add 方法的形参key 可移是 string 或者 number类型 
  // mixed 和 any 都表示任意类型
  // mixed是强类型的 
  // any是弱类型的
  clear(): void;
  // 没有返回值是 返回值的类型是 void
}

export { _Set }

/* 
     在当前js中 export 导出的函数可以直接访问


*/
