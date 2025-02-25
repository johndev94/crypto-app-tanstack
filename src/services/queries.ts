import { keepPreviousData, useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query"
import { getProducts, getProjects, getTodo, getTodosIds } from "./api"


export function useTodosIds(){
    return useQuery({
        queryKey: ['todos'],
        queryFn: getTodosIds,
    })
}

export function useTodos(ids: (number | undefined)[] | undefined) {
    return useQueries({
        queries: (ids ?? []).map((id) => ({
            queryKey: ["todo", {id}],
            queryFn: () => getTodo(id!),
            enabled: !!id, 
        })),
    });
}

export function useProjects(page: number){
    return useQuery({
        queryKey: ['projects', {page}],
        queryFn: () => getProjects(page),
        placeholderData: keepPreviousData
    })
}

export function useProducts(){
    return useInfiniteQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        initialPageParam: 0,
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if(lastPage.length ===0){
                return undefined;
            }
            return lastPageParam+1;
        },
        getPreviousPageParam:(_, __, firstPageParam) => {
            if(firstPageParam <= 1){
                return undefined;
            }
            return firstPageParam-1;
        }
    })
}