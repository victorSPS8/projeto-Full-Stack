# Cadastro de Usuários — Full Stack

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-Portfolio-lightgrey)](#licença)

Aplicação full stack de cadastro de usuários com CRUD, API REST e persistência em MongoDB.

---

## Sobre

Sistema web para cadastrar, listar, atualizar e excluir usuários. O React consome uma API em Express; o Prisma grava os dados no MongoDB.

**Foco do projeto:** integração real entre frontend, backend e banco — não apenas UI mockada.

---

## Demonstração

| Recurso | Link |
|--------|------|
| Frontend | *em breve* |
| API | *em breve* |
| Repositório | [victorSPS8/projeto-Full-Stack](https://github.com/victorSPS8/projeto-Full-Stack) |

---

## Stack

| Camada | Tecnologias |
|--------|-------------|
| Frontend | React 19, Vite, Axios |
| Backend | Node.js, Express 5 |
| Banco | MongoDB + Prisma ORM |
| Qualidade | ESLint, Git |

---

## Arquitetura

```
meu-projeto-fullstack/
├── CADASTRO-DE-USUARIOS/devclub-cadastro-usuarios/  → Frontend
└── API/                                              → Backend
```

**Fluxo:** formulário React → Axios → Express → Prisma → MongoDB → JSON → UI atualizada.

---

## Funcionalidades

- [x] Criar usuário (nome, idade, e-mail)
- [x] Listar usuários
- [x] Excluir usuário
- [x] Atualizar usuário (`PUT` na API)
- [x] Integração Axios frontend ↔ backend
- [x] Persistência MongoDB com Prisma
- [x] Tratamento de erros e status HTTP
- [x] CORS para consumo pelo frontend

---

## API REST

`http://localhost:3000`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/usuarios` | Cria usuário |
| `GET` | `/usuarios` | Lista usuários |
| `PUT` | `/usuarios/:id` | Atualiza usuário |
| `DELETE` | `/usuarios/:id` | Remove usuário |

```json
{
  "name": "Maria Silva",
  "age": 28,
  "email": "maria@email.com"
}
```

---

## Como rodar

**Pré-requisitos:** Node.js (LTS), MongoDB (Atlas ou local), Git.

### Clone

```bash
git clone https://github.com/victorSPS8/projeto-Full-Stack.git
cd projeto-Full-Stack
```

### API

```bash
cd API
npm install
cp .env.example .env
```

Edite o `.env`:

```env
DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/nome_do_banco"
PORT=3000
```

```bash
npx prisma generate
npm run dev
```

Servidor na porta **3000**.

### Frontend

```bash
cd CADASTRO-DE-USUARIOS/devclub-cadastro-usuarios
npm install
npm run dev
```

Acesse `http://localhost:5173`.

---

## O que este projeto demonstra

- Full stack de ponta a ponta (UI + API + banco)
- API REST com métodos HTTP, status codes e JSON
- Prisma + MongoDB (modelagem e CRUD)
- React com hooks e consumo de API
- Separação clara de responsabilidades
- Fluxo de produto completo, não só tela isolada

---

## Próximos passos

- [ ] Validação no frontend e na API
- [ ] Autenticação JWT
- [ ] Edição de usuário na UI
- [ ] Deploy (frontend + API)
- [ ] Testes automatizados
- [ ] Paginação e busca

---

## Autor

**Victor Silva** — Software Engineer

- GitHub: [victorSPS8](https://github.com/victorSPS8)
- LinkedIn: *adicione seu link*

---

## Licença

Uso educacional / portfólio.
