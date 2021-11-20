// Incluindo biblioteca http
const http = require('http');

// Definindo Ip e porta (endereço URL)
const hostname = '127.0.0.1'; // localhost
const port = 3000;

// Implementação da regra de negócio
const server = http.createServer((req, res) => {

  // Pegar pergunta na url
  // Verificar pergunta e escolher resposta
  // Retornar resposta
  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

// Execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});