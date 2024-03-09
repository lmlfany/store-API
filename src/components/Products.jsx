import { useEffect, useState, useRef } from 'react';
export function ListOfProducts ({ products }) {
   
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastVisibleIndex, setLastVisibleIndex] = useState(10);
    const [allProductsLoaded, setAllProductsLoaded] = useState(false);
    const endOfListRef = useRef();

    useEffect(() => {
        setVisibleProducts(products.slice(0, 10));
    }, [products]);
    
    const loadMoreProducts = () => {
        if (isLoading || allProductsLoaded) return;

        setIsLoading(true);
        setTimeout(() => {
            const nextProducts = products.slice(lastVisibleIndex, lastVisibleIndex + 10);
            
            if (nextProducts.length === 0) {
                // No hay más productos para cargar
                setAllProductsLoaded(true);
                setIsLoading(false);
                return;
            }

            setVisibleProducts((prevProducts) => [...prevProducts, ...nextProducts]);
            setLastVisibleIndex(lastVisibleIndex + 10);
            setIsLoading(false);
        }, 1000);
    };
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMoreProducts();
                }
            },
            {
                threshold: 0.5,
            }
        );

        if (endOfListRef.current) {
            observer.observe(endOfListRef.current);
        }

        return () => {
            if (endOfListRef.current) {
                observer.unobserve(endOfListRef.current);
            }
        };
    }, [endOfListRef, loadMoreProducts, lastVisibleIndex, products, allProductsLoaded]);
    
    return (
        <div className="w-full">           
            <div className="max-w-xl items-center justify-between mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 ">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900">Resultados</h5>
                </div>
                <div className="flow-root">
                    <ul  className="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                           visibleProducts.map(product => (
                                <li key={product.id} className="py-3 sm:py-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img className="object-cover size-20 sm:size-40 rounded-lg" src={product.image} alt="Product image" />
                                        </div>
                                        <div className="flex-1 min-w-0 ms-4">
                                            <p className="text-sm font-medium text-gray-900 truncate ">
                                                {product.title}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate dark:text-gray-400" >
                                             {product.description} 
                                            </p>
                                        </div>
                                        <div className="items-end text-base text-right font-semibold text-gray-500 ">
                                            <p className="text-red-700 text-2xl">
                                                -<strong> {product.discount} </strong>
                                            </p> 
                                            ${product.price}
                                        </div>
                                    </div>
                                </li>
                           )) 
                        }
                         <li ref={endOfListRef}></li>
                    </ul>
                    {isLoading && <p className="text-center">Cargando...</p>}
                </div>
            </div>

        </div>


    );
}

export function NoProductsResults (){
    return (
        <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50" role="alert">
        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span className="sr-only">Info</span>
        <div>
            <span className="font-medium">No existen resultados</span> para esta búsqueda
        </div>
</div>
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