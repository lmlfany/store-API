export function ListOfProducts ({ products }) {
    return (
        <div>           
            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 ">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900">Resultados</h5>
                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                           products.map(product => (
                                <li key={product.id} className="py-3 sm:py-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img className="size-20 md:size-40 rounded-lg" src={product.image} alt="Product image" />
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate ">
                                                {product.title}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400" >
                                             {product.description} 
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                                            ${product.price}
                                        </div>
                                    </div>
                                </li>
                           )) 
                        }
                    </ul>
                </div>
            </div>

        </div>


    );
}

export function NoProductsResults (){
    return (
        <p>No hay resultados</p>
    )
}

export function Products ({products}) {
    const hasProducts = products?.length > 0;
    return (
        hasProducts
            ? <ListOfProducts products={products} />
            : <NoProductsResults />
    );
}