### 浏览器内多个标签页之间的通信方式有哪些？

#### [1. localStorage (不可跨域)](./localStorage/)

- 在 Web 开发中，localStorage 是一个用于在浏览器中存储键值对数据的 API，可以被不同标签页或窗口之间共享。借助相关的`storage` event 可以使用它来实现多个标签页之间的通信。

#### [2. cookie (不可跨域)](./cookie/)

- Cookie 是一种小型的文本文件，由服务器发送给用户浏览器，然后浏览器将其存储在用户的计算机上。它包含了一些关键的信息，用于跟踪用户的会话、存储用户偏好设置或执行其他与用户相关的功能。Cookie 是 Web 开发中常用的一种客户端存储技术。我们可以用类似询的方式实现不同标签之间的通信，

#### [3. SharedWorker (不可跨域)](./SharedWorker/)

- 用途： SharedWorker 用于创建一个在多个页面或标签页之间共享的后台线程。它是为了允许多个浏览器上下文（例如，不同标签页或窗口）之间共享数据和通信而设计的。
- 多个上下文： 多个页面可以通过 SharedWorker 实例共享相同的后台线程。这对于需要在不同标签页之间传递消息或共享数据的场景非常有用。
- 通信： SharedWorker 支持通过 postMessage 方法进行消息传递，可以在不同的页面之间传递数据。
- 生命周期： SharedWorker 的生命周期不依赖于打开的页面，而是由所有共享它的页面来管理。只有当所有页面都关闭时，SharedWorker才会被终止。
- SharedWorker 不会在不同的域之间共享。SharedWorker 是在浏览器中运行的脚本，它们被设计为在主线程之外运行，以便执行一些耗时的任务而不阻塞用户界面。由于安全原因，同源策略（Same-Origin Policy）适用于 SharedWorker，这意味着它们的脚本必须与其创建它们的脚本同源。

#### [4. BroadcastChannel (不可跨域)](./BroadcastChannel/)

- BroadcastChannel是 HTML5 中引入的 API，允许在同一浏览器窗口下的不同标签页之间进行发布-订阅式的通信。

#### [5. WebSocket (可跨域)](./WebSocket/)

- 多个标签可以同时连入同一个WebSocket服务器，websocket协议是全双工协议，借助这种双向通信的连接，可以轻松实现不同标签之间的通信。

#### [6. postMessage (可跨域)](./postMessage/)

- 这是一种使用 window.postMessage 方法的通信方式，允许在不同窗口或标签页之间传递消息。
- 通过指定目标窗口的 origin，可以确保安全通信。
