import { useState } from 'react';
import { searchProducts } from '../services/products.js';

export function useProducts ({search}){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const newProducts = await searchProducts({ search });
            setProducts(newProducts);    
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    return { products, getProducts, loading }
}