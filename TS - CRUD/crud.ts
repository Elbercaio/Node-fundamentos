import { createServer, IncomingMessage, ServerResponse } from "http";
import { parse } from "query-string";
import * as url from "url";
import { writeFile, readFile, unlink, readdir } from "fs";

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer(function (
  req: IncomingMessage,
  res: ServerResponse
) {
  let resposta;
  const url_parse = url.parse(req.url ? req.url : "", true);
  const params = parse(url_parse.search ? url_parse.search : "");
  if (url_parse.pathname == "/create" || url_parse.pathname == "/update") {
    // Create & Update user http://127.0.0.1:3000/create?id=1&name=elber&idade=21
    writeFile(
      `users/${params.id}.txt`,
      JSON.stringify(params),
      function (err: any) {
        if (err) throw err;
        resposta = "Usuario criado com sucesso";
        console.log("Created!");
        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(resposta);
        res.end();
      }
    );
  } else if (url_parse.pathname == "/read") {
    // Read user http://127.0.0.1:3000/read?id=1
    readFile(`users/${params.id}.txt`, function (err: any, data) {
      resposta = err ? " Usuário não encontrado" : data;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(resposta);
      res.end();
    });
  } else if (url_parse.pathname == "/delete") {
    // Delete user http://127.0.0.1:3000/delete?id=1
    unlink(`users/${params.id}.txt`, function (err: any) {
      resposta = err
        ? " Usuário não encontrado"
        : `Usuario ${params.id} removido`;
      console.log("Deleted!");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(resposta);
      res.end();
    });
  } else if (url_parse.pathname == "/") {
    // Home
    readdir("./users", function (err: any, files) {
      if (err) throw err;
      resposta = `Numero de usuarios cadastrados: ${files.length}`;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(resposta);
      res.end();
    });
  }
});

server.listen(port, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
