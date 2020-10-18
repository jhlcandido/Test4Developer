import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TodoModal from "../../components/TodoModal";
import ITodo from "../../interfaces/ITodo";
import { api } from "../../services/api";

import { Container, TodoList } from "./styles";

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [name, setName] = useState("");
  const [todoModalVisible, setTodoModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  function loadTodos() {
    api.get<ITodo[]>("/todos").then((r) => {
      setTodos(r.data);
    });
  }

  async function createTodo() {
    if (!name) {
      toast.error("Informe uma descrição para a tarefa");
      return;
    }

    await api.post("/todos", { name }).then((r) => {
      setName("");
      toast.success("Tarefa criada com sucesso");
      loadTodos();
    });
  }

  async function toggleTodo(todo: ITodo) {
    await api
      .put(`/todos`, { ...todo, completed: !todo.completed })
      .then((r) => {
        if (todo.completed) toast.success("Tarefa desfeita com sucesso!");
        else if (!todo.completed)
          toast.success("Tarefa completada com sucesso!");

        loadTodos();
      });
  }

  async function removeTodo(id: string) {
    await api.delete(`/todos/${id}`).then((r) => {
      toast.success("Tarefa removida com sucesso");
      loadTodos();
    });
  }

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    const { key } = e;

    console.log("key up", { key });

    if (key.toLowerCase() === "enter") {
      createTodo();
    }
  }

  function handleChangeTodo(todo: ITodo) {
    if (!todo.completed) {
      setSelectedTodo(todo);
      setTodoModalVisible(true);
    }
  }

  function handleCloseTodoModal() {
    setTodoModalVisible(false);
    setSelectedTodo(null);
  }

  return (
    <Container className="container pt-5">
      <div
        className="row"
        style={{
          height: "calc(100vh - 48px)",
        }}
      >
        <div className="col-12 d-flex flex-column flex-grow-1">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item text-danger" aria-current="page">
                /Todo list
              </li>
            </ol>
          </nav>

          <h5 className="mt-2 mb-4">Lista de Tarefas</h5>

          <TodoList className="flex-fill">
            {todos.map((v) => (
              <li
                key={`todo_${v._id}`}
                className={v.completed ? "completed" : ""}
              >
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={v.completed}
                    onChange={() => toggleTodo(v)}
                  />
                  <label
                    className="form-check-label"
                    onClick={() => handleChangeTodo(v)}
                  >
                    {v.name}
                  </label>

                  {!v.completed && (
                    <button
                      className="btn btn-sm btn-link text-danger"
                      onClick={() => removeTodo(v._id!)}
                    >
                      remover
                    </button>
                  )}
                </div>
              </li>
            ))}
          </TodoList>

          <div className="d-flex pb-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyUp={handleKeyUp}
              className="form-control"
              placeholder="Escreva aqui sua tarefa..."
            />
            <button
              className="btn btn-md btn-primary pl-5 pr-5 ml-4"
              onClick={createTodo}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>

      {todoModalVisible && !!selectedTodo && (
        <TodoModal
          close={() => handleCloseTodoModal()}
          success={() => loadTodos()}
          todo={selectedTodo}
        />
      )}
    </Container>
  );
};

export default Todos;
