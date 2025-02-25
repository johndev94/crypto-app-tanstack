import { useState } from "react";
import { useProjects } from "../services/queries"

export default function Projects(){
    const [page, setPage] = useState(1);
    const {data, isPending, error, isError, isPlaceholderData, isFetching} = useProjects(page)

    return (
        <div>
            {isPending ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <div>
                    {data?.map((project) => (
                        <p key={project.id}>{project.name}</p>
                    ))}
                </div>
            )}

            <div>
                <span>Current page: {page}</span>
                <button onClick={() => setPage((old) => Math.max(old - 1, 1))} disabled={page === 1}>
                    Previous Page
                </button>
                <button
                    onClick={() => {
                        if (!isPlaceholderData) {
                            setPage((old) => old + 1);
                        }
                    }}
                    disabled={isPlaceholderData}
                >
                    Next Page
                </button>
                {isFetching ? (
                    <p>Fetching data</p>
                ) : null}
            </div>
        </div>
    );
}