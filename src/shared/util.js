/* @flow */

export const emptyObject = Object.freeze({})
// Object.freeze({})  Object.freeze 定义的对象不能增加属性也不能修改属性，意味着这个对象任何时候都是空的
// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
export function isUndef(v: any): boolean % checks {
  return v === undefined || v === null
}
// %checks 标记这个函数是一个检查函数 否则这个函数会报错
export function isDef(v: any): boolean % checks {
  return v !== undefined && v !== null
}
// 当函数既不是 undefined 也不是 null的时候 就认为这个函数定义了 isDef的传参是任意类型
//flow 里直接使用检查函数会报错 加上 %checks 可以标记这个函数是一个检查函数

export function isTrue(v: any): boolean % checks {
  return v === true
}
//判断 数据是不是 true

export function isFalse(v: any): boolean % checks {
  return v === false
}
// 判断数据是不是 false
/**
 * Check if value is primitive.
 */
export function isPrimitive(value: any): boolean % checks {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}
/* 
  isPrimitive 判断值是简单的原始的数据类型 string number symbol boolean
*/

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
export function isObject(obj: mixed): boolean % checks {
  return obj !== null && typeof obj === 'object'
}
/* 
  mixed 虽然表示任意类型， 但它还是强类型
  判断是不是对象类型的前提是排除掉null的干扰，null 是一个空指针，但是null的typeof值仍然是 object
*/

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
const _toString = Object.prototype.toString
/* 
  Object.prototype.toString.call() 精准地判断数据类型
*/

export function toRawType(value: any): string {
  return _toString.call(value).slice(8, -1)
}
// 
/* 
获取一个值的原始类型字符串
在任何值上调用 Object 原生的toString方法，都会返回一个 [object NativeConstructorName]格式的字符串
 NativeConstructorName 就是掉用 Object.prototype.toString.call() 需要的返回值类型

*/

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject(obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}
/*
    严格的类型检查 
    只是在 简单js对象 {} 返回true
    有一些数据类型，虽然也是对象类型，但是它有着更精准的数据类型
    如
    Object.prototype.toString.call([]) "[object Array]"
    Object.prototype.toString.call(()=>{})  "[object Function]"
    Object.prototype.toString.call(null)   "[object null]"
*/

export function isRegExp(v: any): boolean {
  return _toString.call(v) === '[object RegExp]'
}
// Object.prototype.toString.call(/s0/)  检测一个数据是不是正则类型
/**
 * Check if val is a valid array index.
 */
export function isValidArrayIndex(val: any): boolean {
  const n = parseFloat(String(val))
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}
/* 
  检查一个值是不是合法的数组索引
  非负数
  整数 
  有限大

*/
export function isPromise(val: any): boolean {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}
/* 
    判断一个数据类型是不是 promise 
      收先判断是不是 undefined 并且 值的then 和 catch 是一个函数

*/

/**
 * Convert a value to a string that is actually rendered.
 */
export function toString(val: any): string {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}
/* 
  将一个值转换为 字符串
    判单是否为null 如果值是null 就返回空字符串
    判断值是否为数组类型 或者 是个空对象并且  

*/
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
export function toNumber(val: string): number | string {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}
/* 
  把一个值转换成数字 
    转换成功 返回数字
    转换失败 原样返回
*/
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
export function makeMap(
  str: string,
  expectsLowerCase?: boolean
): (key: string) => true | void {
  /* 
    makeMap
    expectsLowerCase? 此处表示可选参数
    a?.b 
      如果无法确定a 是否为空 则需要使用 a?.b 表示a 有值时才访问 b属性,没有值的时候不去访问
  */
  const map = Object.create(null)
  /* 
    Object.create(null) 与 {} 的区别
    Object.create(null) 创建的是一个绝对的空对象，没有原型上的属性也没有构造函数
  */
  const list: Array<string> = str.split(',')
  /* 
    const list:Array<string>=str.split(',')
    Array:<list>  表示创建一个数据类型为字符串的数组
  
  */
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
    // 将数组中的每一项存入map中
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
  // 如果存入了 expectsLowerCase 就使用小写 否则使用大写
  // toLowerCase
}
/**
 * Check if a tag is a built-in tag.
 */
export const isBuiltInTag = makeMap('slot,component', true)

/**
 * Check if an attribute is a reserved attribute.
 */
export const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is')

/**
 * Remove an item from an array.
 */
export function remove(arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj: Object | Array<*>, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
export function cached<F: Function>(fn: F): F {
  const cache = Object.create(null)
  return (function cachedFn(str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }: any)
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g
export const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

/**
 * Capitalize a string.
 */
export const capitalize = cached((str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached((str: string): string => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind(fn: Function, ctx: Object): Function {
  function boundFn(a) {
    const l = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length
  return boundFn
}

function nativeBind(fn: Function, ctx: Object): Function {
  return fn.bind(ctx)
}

export const bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind

/**
 * Convert an Array-like object to a real Array.
 */
export function toArray(list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

/**
 * Mix properties into target object.
 */
export function extend(to: Object, _from: ?Object): Object {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
export function toObject(arr: Array<any>): Object {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
export function noop(a?: any, b?: any, c?: any) { }

/**
 * Always return false.
 */
export const no = (a?: any, b?: any, c?: any) => false

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
export const identity = (_: any) => _

/**
 * Generate a string containing static keys from compiler modules.
 */
export function genStaticKeys(modules: Array<ModuleOptions>): string {
  return modules.reduce((keys, m) => {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
export function looseEqual(a: any, b: any): boolean {
  if (a === b) return true
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e, i) => {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        return keysA.length === keysB.length && keysA.every(key => {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
export function looseIndexOf(arr: Array<mixed>, val: mixed): number {
  for (let i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) return i
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
export function once(fn: Function): Function {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
