// Incluindo bibliotecas
const http = require("http");
const url = require("url");
const querystring = require("query-string");

// Definindo Ip e porta (endereço URL)
const hostname = "127.0.0.1"; // localhost
const port = 3000;

// Implementação da regra de negócio
const server = http.createServer((req, res) => {
  // Pegar pergunta na url
  const params = querystring.parse(url.parse(req.url, true).search);
  // Verificar pergunta e escolher resposta
  let resposta;
  if (params.pergunta == "melhor-filme") {
    resposta = "Sonic The Hedgehog";
  } else if (params.pergunta == "pior-filme") {
    resposta = "Qualquer filme do Nolan";
  } else if (params.pergunta == "melhor-tecnologia-backend") {
    resposta = "Node.js?";
  } else {
    resposta = "Tente: Infelizmento não sei responder";
  }
  // Retornar resposta
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(resposta);
});

// Execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
