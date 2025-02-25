import { Fragment } from "react";
import { useProducts } from "../services/queries";
import { useState } from "react";

export default function Products() {
    const productsQuery = useProducts();
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    if (productsQuery.isPending) return <div>Loading...</div>;
    if (productsQuery.isError) return <div>Error: {productsQuery.error.message}</div>;

    return (
        <>
            {productsQuery.data?.pages.map((group, index) => (
                <Fragment key={index}>
                    {group.map((product) => (
                        <Fragment key={product.id}>
                            <button onClick={() => setSelectedProductId(product.id)}>
                                {product.name}
                            </button>
                            <br />
                        </Fragment>
                    ))}
                </Fragment>
            ))}
            <br/>
            <div>
                <button onClick={() => productsQuery.fetchNextPage()} disabled={!productsQuery.hasNextPage || productsQuery.isFetchNextPageError}>
                    {productsQuery.isFetchingNextPage ? 'Loading more' : productsQuery.hasNextPage ? 'Load More' : 'No more pages'}
                </button>
            </div>
        </>
    );
}
