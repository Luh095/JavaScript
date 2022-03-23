import express from "express";      //Importar o framework web EXPRESS que executa no ambiente node.js em tempo de processamento.
import { promises as fs } from "fs";    //Importar o módulo FILE SYSTEM a fim de ler e escrever arquivos do lado do servidor.

const { readFile, writeFile } = fs;     //Identificando os métodos de leitura e escrita de arquivos provenientes do FILE SYSTEM.

const router = express.Router();        //Criação da variável para criar rotas de forma modularizada, com .get(), .put(), .post(), etc.

router.post("/", async (req, res, next) => {        //ROUTER.POST encaminha solicitações HTTP POST para o caminho especificado 
                                                    //com as funções de retorno de chamada especificadas.
  try {
    let account = req.body;                         //Criação da variável 'ACCOUNT' com a requisição do usuário para adicionar um novo objeto.

    if (!account.name || account.balance == null) {         //A postagem deve atender as condições básicas de possuírem nome e salário.
                                                            //Caso contrário, será atribuído uma mensagem de erro ao usuário.
      throw new Error("Name e Balance são obrigatórios.");
    }
    const data = JSON.parse(await readFile(global.fileName));   //Criação da variável 'DATA' que realiza a leitura do arquivo original.
    account = {                                                 //A variável 'ACCOUNT', declarada anteriormente recebe o nome e salário definidos pelo usuário
                                                                //E o id é alterado automaticamente, somando 1 ao último id que existe no corpo do arquivo.
      id: data.nextId++,                                    
      name: account.name,
      balance: account.balance,
    };
    data.accounts.push(account);                                        //Os dados da variável 'ACCOUNT' são adicionados no arquivo original 'DATA'.
    await writeFile(global.fileName, JSON.stringify(data, null, 2));    //O arquivo modificado é escrito.
    res.send(account);                                                  //É enviado o arquivo com a nova alteração.
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {         //ROUTER.GET encaminha solicitações HTTP GET para o caminho especificado com as funções de retorno de chamada especificadas.
  try {
    const data = JSON.parse(await readFile(global.fileName));   //Criação da variável 'DATA' que realiza a leitura do arquivo original.
    delete data.nextId;                                         //É realizada a leitura apenas dos objetos existentes com nome e salário definidos.
    res.send(data);                                 //É enviado o arquivo com seus respectivos dados.
  } catch (err) {
    next(err);
  }
});


router.get("/:id", async (req, res, next) => {      //ROUTER.GET encaminha solicitações HTTP GET para o caminho especificado com as funções de retorno de chamada especificadas.
  try {
    const data = JSON.parse(await readFile(global.fileName));   //Criação da variável 'DATA' que realiza a leitura do arquivo original.
    const account = data.accounts.find(                         //Criação da variável 'ACCOUNT' que faz uma busca pelo arquivo
                                                                //Para encontrar os dados do parâmetro de ID requisitado pelo usuário.
      (account) => account.id === parseInt(req.params.id)
    );
    res.send(account);          //É enviada a resposta da variável 'ACCOUNT' ao usuário com os dados encontrados.
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {     //ROUTER.PUT encaminha solicitações HTTP PUT para o caminho especificado com as funções de retorno de chamada especificadas. 
  try {
    const account = req.body;       //Criação da variável 'ACCOUNT' com a requisição do usuário para atualizar um objeto.

    if (!account.id || !account.name || account.balance == null) {      //A atualização deve atender as condições básicas de identificação do id, nome e salário requisitados.
                                                                        //Caso contrário, será atribuído uma mensagem de erro ao usuário.
      throw new Error("Id, Name e Balance são obrigatórios.");
    }

    const data = JSON.parse(await readFile(global.fileName));           //Criação da variável 'DATA' que realiza a leitura do arquivo original.
    const index = data.accounts.findIndex((a) => a.id === account.id);  //Criação da variável 'INDEX' que realiza a busca no arquivo a partir do ID identificado pelo usuário.

    if (index === -1) {                             //Condição de erro caso o id não seja encontrado no arquivo.
      throw new Error("Registro não encontrado.");
    }
    data.accounts[index].name = account.name;                       //Depois de encontrado o id, o nome e o salário específicos são retornados.
    data.accounts[index].balance = account.balance;                 
    await writeFile(global.fileName, JSON.stringify(data, null, 2));    //O arquivo com os dados atualizados é escrito.
    res.send(account);                                                  //É enviada a resposta da variável 'ACCOUNT' ao usuário com os dados específicos modificados.
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {      //ROUTER.USE monta a função de middleware especificadas no caminho especificado.
                                           //Trata-se de um middleware de TRATAMENTO DE ERROS porque sempre leva 4 argumentos, mesmo não utilizando todos eles.
  res.status(400).send({ error: err.message });     //Identifica a porta HTTP da resposta e envia a resposta com o respectivo corpo de código.
});

export default router; //Responsável pela exportação do arquivo com as rotas a serem utilizadas pelo INDEX.JS.