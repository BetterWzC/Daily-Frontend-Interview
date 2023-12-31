const WebSocket = require('ws');
const http = require('http');

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket Server\n');
});

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ server });

// 监听 WebSocket 连接
wss.on('connection', (ws) => {
  console.log('Client connected');

  // 监听客户端发送的消息
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    if (message instanceof Buffer) {
      message = message.toString('utf-8');
    }
    
    // 广播消息给所有连接的客户端
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // 监听连接关闭
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// 启动服务器
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
