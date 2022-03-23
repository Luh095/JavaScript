import express from "express";                      //Importar o framework web EXPRESS que executa no ambiente node.js em tempo de processamento.
import accountsRouter from "./routes/accounts.js";  //Importar o arquivo com as rotas criadas.
import { promises as fs } from "fs";                //Importar o módulo FILE SYSTEM a fim de ler e escrever arquivos do lado do servidor.
import cors from "cors";

const { readFile, writeFile } = fs;     //Identificando os métodos de leitura e escrita de arquivos provenientes do FILE SYSTEM.
global.fileName = "accounts.json";      //Indica o arquivo com os objetos a serem manipulados.

const app = express();      //Realiza a instanciação do EXPRESS que permite criar as rotas.
app.use(express.json());    //Trata-se de uma função que analisa e retorna as solicitações de entrada do arquivo JSON.
app.use(cors()); 
app.use(express.static("public"));
app.use("/account", accountsRouter);  //Indicando a utilização do arquivo programado com as rotas a serem executadas.
app.listen(3000, async () => {          //Executa o processo na porta 3000.
  try {
    await readFile(global.fileName);    //Realiza a leitura do arquivo de dados, e já carrega o NODE na porta 3000.
    console.log("API Started!");
  } catch (err) {                       //Caso seja identificado erro, é inicializada a criação de um arquivo na variável 'INITIALJSON'.
                                        //Com o ID já especificado automaticamente.
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(global.fileName, JSON.stringify(initialJson)) //É escrito e salvo no arquivo os dados criados na variável 'INITIALJSON'.   
      .then(() => {
        console.log("API Started and File Created!");   //Retorna uma mensagem se o documento foi criado sem erros.
      })
      .catch((err) => {
        console.log(err);
      });
  }
});