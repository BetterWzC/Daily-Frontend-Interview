### 请解释 call, apply, bind 的区别并手写实现相同的方法

call, apply, bind 都是 JavaScript 中用于管理函数上下文(this 值)和参数的方法

#### call

- 作用： 调用函数，传递一个指定的 this 值和一系列参数。
- 语法： function.call(thisArg, arg1, arg2, ...)
- 例子：

```JavaScript
const objCall = { name: 'Emily' };

function greetCall(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

greetCall.call(objCall, 'Bonjour', '???'); // 输出: Bonjour, Emily???
```

- 手写实现

```JavaScript
// 简化版的手写 call
Function.prototype.myCall = function(context, ...args) {
  // 如果没有传递上下文，使用全局对象（浏览器环境下是 window）
  context = context || globalThis;
  const uniqueKey = Symbol('uniqueKey');
  context[uniqueKey] = this;
  const result = context[uniqueKey](...args);
  delete context[uniqueKey];
  return result;
};
```

#### apply

- 作用： 调用函数，传递一个指定的 this 值和一个参数数组。
- 语法： function.apply(thisArg, [argsArray])
- 例子：

```JavaScript
const objApply = { name: 'Tom' };

function greetApply(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

greetApply.apply(objApply, ['Hola', '!!!']); // 输出: Hola, Tom!!!
```

- 手写实现

```JavaScript
// 简化版的手写 apply
Function.prototype.myApply = function(context, argsArray) {
  // 如果没有传递上下文，使用全局对象（浏览器环境下是 window）
  context = context || globalThis;
  const uniqueKey = Symbol('uniqueKey');
  context[uniqueKey] = this;
  const result = context[uniqueKey](...(argsArray || []));
  delete context[uniqueKey];
  return result;
};
```

#### bind

- 作用： 创建一个新的函数，其 this 值被绑定到指定的对象，并返回这个新函数。
- 语法： function.bind(thisArg[, arg1[, arg2[, ...]]])，[, arg1[, arg2[, ...]]]: 表示可选参数的集合，可以选择性地传递多个参数。方括号内的 , 表示这是一个可选的参数，并且可以有多个这样的参数。

- 例子：

```JavaScript
const objBind = { name: 'Chris' };

function greetBind(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const boundGreet = greetBind.bind(objBind, 'Salut');
boundGreet('!!!'); // 输出: Salut, Chris!!!

```

- 手写实现

```JavaScript
Function.prototype.myBind = function(context, ...args) {
  // 保存当前函数的引用
  const originalFunction = this;
  // 返回一个新函数
  return function(...newArgs) {
    // 在新函数中调用原始函数，传递绑定的上下文和合并的参数
    return originalFunction.apply(context, [...args, ...newArgs]);
  };
};
```
