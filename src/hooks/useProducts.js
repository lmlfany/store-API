import { useState, useRef, useMemo, useCallback } from 'react';
import { searchProducts } from '../services/products.js';

export function useProducts ({search, sort, sortAZ}){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const previousSearch = useRef(search);
    

    const getProducts = useCallback(async ({ search }) => {
        if (search === previousSearch.current) return;

        try {
            setLoading(true);
            setError(null);
            previousSearch.current = search;
            const newProducts = await searchProducts({ search });
            setProducts(newProducts);    
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [] );

    const sortedProducts = useMemo(() => {
        return sort
        ? [...products].sort((a, b) => a.price - b.price)
        : products

    }, [sort, products])

    // const sortedProductsAZ = useMemo(() => {
    //     return sortAZ
    //     ? [...products].sort((a, b) => a.title.localeCompare(b.title))
    //     : products

    // }, [sortAZ, products])

    return { products: sortedProducts, getProducts, loading }
}