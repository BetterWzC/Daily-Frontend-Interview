
// shared-worker.js
let sharedData = 'Initial shared data';

onconnect = function (e) {
  const port = e.ports[0];

  // 处理从页面发送过来的消息
  port.onmessage = function (event) {
    if (event.data === 'getSharedData') {
      // 发送当前的共享数据给页面
      port.postMessage(sharedData);
    } else {
      // 更新共享数据
      sharedData = event.data;
    }
  };

  // 向页面发送连接成功的消息
  port.postMessage('Connected to SharedWorker');
};
