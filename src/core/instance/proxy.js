/* not type checking this file because flow doesn't play well with Proxy */

import config from 'core/config'
import { warn, makeMap, isNative } from '../util/index'

let initProxy

if (process.env.NODE_ENV !== 'production') {
  const allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,' +
    'require' // for Webpack/Browserify
  )
  // js中可以全局访问的 


  const warnNonPresent = (target, key) => {
    warn(
      `Property or method "${key}" is not defined on the instance but ` +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    )
  }

  const warnReservedPrefix = (target, key) => {
    warn(
      `Property "${key}" must be accessed with "$data.${key}" because ` +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    )
  }

  const hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy)
  // 判断Proxy 是否存在 
  if (hasProxy) {
    debugger
    const isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact')
    // 用makeMap函数来修饰是否是内置修饰符
    config.keyCodes = new Proxy(config.keyCodes, {
      set(target, key, value) {
        // config.keyCodes 设置set 代理，防止内置修饰符被覆盖
        if (isBuiltInModifier(key)) {
          warn(`Avoid overwriting built-in modifier in config.keyCodes: .${key}`)
          return false
        } else {
          target[key] = value
          return true
        }
      }
    })
  }

  const hasHandler = {
    has(target, key) {
      debugger
      const has = key in target// 此处的target是 vue实例 key in target表示是否是vue实例上的属性
      // target 要代理的对象，此处时 vue ,key 在外部操作时访问的属性
      console.log("allowedGlobals", allowedGlobals, target.$data)
      const isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data))
      /* 
        allowedGlobals 
          在模板引擎里，有一些属性vm没有进行代理，但是也能使用，如 number 等
          _ 下划线开头的属性 vue的内置属性
          不在data里定义的属性

      
      */
      if (!has && !isAllowed) {
        // 不是vue 实例上的属性 并且 也不是内置属性 是data上的属性
        debugger
        if (key in target.$data) warnReservedPrefix(target, key)
        else warnNonPresent(target, key)
      }
      return has || !isAllowed
    }
  }

  const getHandler = {
    get(target, key) {
      debugger
      console.log("target.$data", target.$data)
      if (typeof key === 'string' && !(key in target)) {
        //检测data 属性是不是  $. _开头
        if (key in target.$data) {
          warnReservedPrefix(target, key)
        }
        else {
          warnNonPresent(target, key)
        }
      }
      return target[key]
    }
  }

  initProxy = function initProxy(vm) {
    debugger
    if (hasProxy) {
      //判断是否支持  Proxy代理 
      // determine which proxy handler to use
      const options = vm.$options
      // vm.$options 表示传入的选项
      const handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler
      vm._renderProxy = new Proxy(vm, handlers)
    } else {
      vm._renderProxy = vm
    }
  }
}

export { initProxy }
