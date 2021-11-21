"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const query_string_1 = require("query-string");
const url = __importStar(require("url"));
const fs_1 = require("fs");
const hostname = "127.0.0.1";
const port = 3000;
const server = (0, http_1.createServer)(function (req, res) {
    let resposta;
    const url_parse = url.parse(req.url ? req.url : "", true);
    const params = (0, query_string_1.parse)(url_parse.search ? url_parse.search : "");
    if (url_parse.pathname == "/create" || url_parse.pathname == "/update") {
        // Create & Update user http://127.0.0.1:3000/create?id=1&name=elber&idade=21
        (0, fs_1.writeFile)(`users/${params.id}.txt`, JSON.stringify(params), function (err) {
            if (err)
                throw err;
            resposta = "Usuario criado com sucesso";
            console.log("Created!");
            res.writeHead(201, { "Content-Type": "application/json" });
            res.write(resposta);
            res.end();
        });
    }
    else if (url_parse.pathname == "/read") {
        // Read user http://127.0.0.1:3000/read?id=1
        (0, fs_1.readFile)(`users/${params.id}.txt`, function (err, data) {
            resposta = err ? " Usuário não encontrado" : data;
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(resposta);
            res.end();
        });
    }
    else if (url_parse.pathname == "/delete") {
        // Delete user http://127.0.0.1:3000/delete?id=1
        (0, fs_1.unlink)(`users/${params.id}.txt`, function (err) {
            resposta = err
                ? " Usuário não encontrado"
                : `Usuario ${params.id} removido`;
            console.log("Deleted!");
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(resposta);
            res.end();
        });
    }
    else if (url_parse.pathname == "/") {
        // Home
        (0, fs_1.readdir)("./users", function (err, files) {
            if (err)
                throw err;
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
