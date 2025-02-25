import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/todo";
import { createTodo, deleteTodo, updateTodo } from "./api";

export function useCreateTodo(){
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn:(data: Todo) => createTodo(data),
        onMutate: () => {
            console.log("mutate");
        },
        onError: () => {
            console.log("Error");
        },
        onSuccess: () => {
            console.log("Success");
        },
        onSettled: async (_, error) => {
            if(error)
            {
                console.log("Error")
            }
            //fetches data again in background
            else{
                await queryClient.invalidateQueries({queryKey:['todos']})
            }
            
            console.log("Settled");
        }
    });
}

export function useUpdateTodo(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Todo) => updateTodo(data),

        onSettled: async(_, error, variables) =>{
            if(error){
                console.log("Error")
            } else{
                await queryClient.invalidateQueries({queryKey: ['todos']});
                await queryClient.invalidateQueries({queryKey: ['todo', {id: variables.id}]});
            }
        }

    })

}

export function useDeleteTodo(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteTodo(id),

        onSuccess: () => {
            console.log("Item deleted")
        },
        onSettled: async(_, error) => {
            if(error)
            {
                console.log("Error")
            } else {
                await queryClient.invalidateQueries({queryKey: ['todos']});
            }
        }
    })
}

function async(error: any, variables: any): ((data: void | undefined, error: Error | null, variables: Todo, context: unknown) => Promise<unknown> | unknown) | undefined {
    throw new Error("Function not implemented.");
}
