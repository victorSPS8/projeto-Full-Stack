import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {
  // tudo que está dentro da função Home é JavaScript, que é a linguagem de programação usada para criar a lógica do aplicativo. A função Home é um componente funcional do React, que é uma biblioteca JavaScript para criar interfaces de usuário. O React permite criar componentes reutilizáveis e gerenciar o estado da aplicação de forma eficiente.

  const [users, setUsers] = useState([]); // Assim que o setUsers roda, o React percebe a mudança na hora. Ele atualiza a sua página automaticamente (faz um re-render) para mostrar os novos usuários na tela sem que o cliente precise atualizar o navegador. O 'setUsers' apaga o array vazio e coloca os usuários da API lá dentro. De forma bem resumida, a linha const [users, setUsers] = useState([]); faz o seguinte:Ela cria uma variável de memória dentro do React para guardar dados que podem mudar.
  // users: É onde os dados ficam guardados (começa como uma lista vazia []).
  // setUsers: É a única função que tem permissão para atualizar essa lista.
  // O superpoder: Sempre que você usa o setUsers para atualizar a lista, o React redesenha a tela na hora com os novos dados.
  //  É como um placar de jogo: users é o placar atual e setUsers é o botão que você aperta para mudar o placar.

  const inputName = useRef(); // useRef é um hook do React que permite criar uma referência para um elemento do DOM (Document Object Model). Ele é usado para acessar diretamente elementos HTML e manipular seus valores ou propriedades sem precisar usar o estado do React. No caso, inputName é uma referência para o campo de input do nome, permitindo que você acesse e modifique seu valor diretamente quando necessário.
  const inputAge = useRef(); // useRef é um hook do React que permite criar uma referência para um elemento do DOM (Document Object Model). Ele é usado para acessar diretamente elementos HTML e manipular seus valores ou propriedades sem precisar usar o estado do React. No caso, inputAge é uma referência para o campo de input da idade, permitindo que você acesse e modifique seu valor diretamente quando necessário.
  const inputEmail = useRef(); // useRef é um hook do React que permite criar uma referência para um elemento do DOM (Document Object Model). Ele é usado para acessar diretamente elementos HTML e manipular seus valores ou propriedades sem precisar usar o estado do React. No caso, inputEmail é uma referência para o campo de input do email, permitindo que você acesse e modifique seu valor diretamente quando necessário.

  async function getUsers() {
    const usersFromApi = await api.get("/usuarios");
    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    try {
      const payload = {
        name: inputName.current.value,
        age: Number(inputAge.current.value),
        email: inputEmail.current.value,
      };

      await api.post("/usuarios", payload);

      // limpar inputs
      if (inputName.current) inputName.current.value = "";
      if (inputAge.current) inputAge.current.value = "";
      if (inputEmail.current) inputEmail.current.value = "";

      getUsers();
    } catch (error) {
      console.error(
        "Erro ao cadastrar:",
        error.response?.data || error.message,
      );
      alert(
        "Erro ao cadastrar usuário: " +
          (error.response?.data?.error || error.message),
      );
    }
  }

async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
  }

  useEffect(() => {
    async function loadUsers() {
      const usersFromApi = await api.get("/usuarios");
      setUsers(usersFromApi.data);
    }

    loadUsers();
  }, []);

  return (
    // Tudo que está dentro do return é JSX, que é uma sintaxe que permite escrever HTML dentro do JavaScript. O JSX é transformado em JavaScript puro pelo Babel antes de ser interpretado pelo navegador. Ele é usado para criar a interface do usuário de forma declarativa, tornando o código mais legível e fácil de entender. E tudo que se colocar dentro do return de html aparecerá na tela do navegador.

    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input name="nome" type="text" placeholder="Nome" ref={inputName} />
        <input name="idade" type="number" placeholder="Idade" ref={inputAge} />
        <input name="email" type="email" placeholder="Email" ref={inputEmail} />
        <button type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Nome: <span>{user.name}</span>
            </p>
            <p>
              Idade: <span>{user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
