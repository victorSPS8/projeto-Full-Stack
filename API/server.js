// express é uma biblioteca que facilita a criação de servidores web em Node.js.
// Importamos o express:
import express from "express"; // importamos o express, que é uma biblioteca que facilita a criação de servidores web em Node.js.

import cors from "cors"; // importamos o cors, que é uma biblioteca que permite que o servidor aceite requisições de diferentes origens (domínios). Isso é útil para permitir que clientes hospedados em diferentes domínios acessem a API do servidor sem problemas de CORS (Cross-Origin Resource Sharing).

import { PrismaClient } from "@prisma/client"; // importamos o PrismaClient, que é uma classe gerada pelo Prisma que nos permite interagir com o banco de dados de forma simples e segura.

const prisma = new PrismaClient({
  // Criamos uma instância do PrismaClient, que nos permite interagir com o banco de dados de forma simples e segura. O PrismaClient é configurado com a URL do banco de dados, que é obtida a partir da variável de ambiente DATABASE_URL. Isso permite que a aplicação se conecte ao banco de dados especificado na URL e execute operações de leitura e escrita de forma eficiente e segura.
  datasources: {
    db: {
      url: process.env.DATABASE_URL, // A URL do banco de dados é obtida a partir da variável de ambiente DATABASE_URL, que deve ser definida no ambiente de execução da aplicação. Isso permite que a aplicação se conecte ao banco de dados especificado na URL e execute operações de leitura e escrita de forma eficiente e segura.
    },
  },
}); // Criamos uma instância do PrismaClient, que nos permite interagir com o banco de dados de forma simples e segura.

//criamos a variável app para armazenar a instância do express:
const app = express(); // Criamos a variável app para armazenar a instância do express, que é o objeto principal da aplicação e que será usado para definir rotas, middlewares e outras configurações do servidor.

// Definimos uma rota, porque não é possivel criar rotas sem definir oque a rota vai fazer, então definimos uma rota para a raiz do site, que é o '/' e passamos uma função que recebe dois parâmetros: req (request) e res (response).

app.use(express.json()); // Middleware para habilitar o parsing de JSON no corpo das requisições. Isto permite que o servidor entenda e processe dados enviados em formato JSON.

app.use(cors()); // Middleware para habilitar o CORS (Cross-Origin Resource Sharing), permitindo que o servidor aceite requisições de diferentes origens (domínios). Isso é útil para permitir que clientes hospedados em diferentes domínios acessem a API do servidor sem problemas de CORS. Mas, essa forma não é a mais segura, pois permite que qualquer origem acesse a API. Para maior segurança, é recomendado configurar o CORS para permitir apenas origens específicas. O correto seria: app.use(cors({ origin: 'http://localhost:3000' })) para permitir apenas requisições vindas do localhost na porta 3000. Mas, para fins de teste e desenvolvimento, a configuração atual é suficiente.

//const users = []; // Array para armazenar os usuários. Aqui eu salvo os usuários em um array chamado users, que será usado para armazenar os dados dos usuários cadastrados na aplicação.

app.post("/usuarios", async (req, res) => {
  // Definimos uma rota para o método POST na rota '/usuarios', que será usada para criar novos usuários. Async é usado para indicar que a função é assíncrona, permitindo o uso de await dentro dela para lidar com operações assíncronas, como a criação de usuários no banco de dados.

  //console.log(req.body) // Apenas Req,  exibimos no console o objeto req, que contém informações sobre a requisição recebida, como os parâmetros, cabeçalhos e corpo da requisição. req.body é o corpo da requisição, que contém os dados enviados pelo cliente em formato JSON.
  //users.push(req.body); // Passamos de console.log(req.body) para users.push(req.body) porque mudamos o objetivo do código de apenas visualizar os dados para armazená-los de verdade na aplicação.

  try {
    const created = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: Number(req.body.age),
      },
    });

    res.status(201).json(created);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res
      .status(500)
      .json({ error: error.message || "Erro interno ao criar usuário" });
  }
  // 201 é o código de status HTTP que indica que a requisição foi bem-sucedida e que um novo recurso foi criado no servidor.
});

app.get("/usuarios", async (req, res) => {
  // Definimos uma rota para o método GET na rota '/usuarios', que será usada para listar os usuários cadastrados.

  const users = await prisma.user.findMany(); // Chamamos o método findMany do Prisma para buscar todos os usuários cadastrados no banco de dados. O método findMany retorna um array com todos os registros encontrados na tabela de usuários. Await é usada para aguardar a conclusão da operação de busca no banco de dados antes de prosseguir com a execução do código. Isso garante que todos os usuários sejam recuperados corretamente antes de enviar a resposta para o cliente. Colocamos const users = await prisma.user.findMany() para armazenar o resultado da busca em uma variável chamada users, que será usada para enviar os dados dos usuários para o cliente.

  //res.send('Rota de usuários') // Enviamos uma resposta para o cliente com a mensagem 'Rota de usuários', indicando que a requisição foi recebida e processada com sucesso.

  res.status(200).json(users); // Enviamos uma resposta para o cliente com o array de usuários cadastrados em formato JSON, permitindo que o cliente visualize os dados armazenados na aplicação.  Aqui é uma rota de listagem de usuários, que retorna todos os usuários cadastrados no array users.
  //200 é o código de status HTTP que indica que a requisição foi bem-sucedida e que o servidor retornou os dados solicitados.
});

app.put("/usuarios/:id", async (req, res) => {
  // Definimos uma rota para o método PUT na rota '/usuarios', que será usada para atualizar os dados de um usuário existente. O método PUT é usado para atualizar recursos existentes no servidor, e neste caso, estamos atualizando os dados de um usuário específico.
  try {
    const updated = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        email: req.body.email,
        name: req.body.name,
        age: Number(req.body.age),
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res
      .status(500)
      .json({ error: error.message || "Erro interno ao atualizar usuário" });
  }
});

app.delete("/usuarios/:id", async (req, res) => {
  try {
    const deleted = await prisma.user.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: "Usuário deletado com sucesso!", deleted });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res
      .status(500)
      .json({ error: error.message || "Erro interno ao deletar usuário" });
  }
});

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.log(
        `Porta ${port} já está em uso. Tentando a porta ${port + 1}...`,
      );
      if (server.listening) {
        server.close();
      }
      startServer(port + 1);
    } else {
      console.error(error);
      process.exit(1);
    }
  });
}

startServer(Number(process.env.PORT || 3000));



//DATABASE_URL="prisma+postgres://localhost:51213/?api_key=eyJkYXRhYmFzZVVybCI6InBvc3RncmVzOi8vcG9zdGdyZXM6cG9zdGdyZXNAbG9jYWxob3N0OjUxMjE0L3RlbXBsYXRlMT9zc2xtb2RlPWRpc2FibGUmY29ubmVjdGlvbl9saW1pdD0xMCZjb25uZWN0X3RpbWVvdXQ9MCZtYXhfaWRsZV9jb25uZWN0aW9uX2xpZmV0aW1lPTAmcG9vbF90aW1lb3V0PTAmc29ja2V0X3RpbWVvdXQ9MCIsIm5hbWUiOiJkZWZhdWx0Iiwic2hhZG93RGF0YWJhc2VVcmwiOiJwb3N0Z3JlczovL3Bvc3RncmVzOnBvc3RncmVzQGxvY2FsaG9zdDo1MTIxNS90ZW1wbGF0ZTE_c3NsbW9kZT1kaXNhYmxlJmNvbm5lY3Rpb25fbGltaXQ9MTAmY29ubmVjdF90aW1lb3V0PTAmbWF4X2lkbGVfY29ubmVjdGlvbl9saWZldGltZT0wJnBvb2xfdGltZW91dD0wJnNvY2tldF90aW1lb3V0PTAifQ"
