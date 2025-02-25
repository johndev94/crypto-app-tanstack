import { SubmitHandler, useForm } from "react-hook-form";
import { createTodo } from "../services/api";
import { useCreateTodo, useDeleteTodo, useUpdateTodo } from "../services/mutations";
import { useTodos, useTodosIds } from "../services/queries";
import { Todo } from "../types/todo";

export default function Todos() {
  const todosIdsQuery = useTodosIds();
  const todosQueries = useTodos(todosIdsQuery.data);

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const { register, handleSubmit } = useForm<Todo>();

  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
  };

  const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
    if(data){
      updateTodoMutation.mutate({...data, checked: true});
    }
  }

  const handleDeleteTodoSubmit = (id: number) => {
    if(id){
      deleteTodoMutation.mutate(id);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New Todo:</h4>
        <input placeholder="Title" {...register("title")} />
        <br />
        <input placeholder="Description" {...register("description")} />
        <br />
        <input type="submit" disabled={createTodoMutation.isPending} value={createTodoMutation.isPending ? "Creating..." : "Create new todo" }/>
      </form>

      <ul>
        {todosQueries.map(({ data }) => (
          <li key={data?.id}>
            <div>ID: {data?.id}</div>
            <span>
              <strong>Title: </strong> {data?.title}, {""}
              <strong>Description</strong> {data?.description}, {""}
            </span>
            <div>
              <button onClick={() => handleMarkAsDoneSubmit(data)} disabled={data?.checked}>
                {data?.checked ? "Done" : "Mark as done"}
              </button>
              {data && data?.id && (
                <button onClick={() => handleDeleteTodoSubmit(data.id!)}>Delete</button>
              )}
              
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
