const API_KEY = 'products';

export const searchProducts = async ({search}) => {
    if(search === '') return null;

    try {
        const response = await  fetch(`https://dummyjson.com/${API_KEY}/search?q=${search}`);
        const json = await response.json();
        
        const products = json.products;

        return products?.map(product =>({
            id: product.id,
            title: product.title,
            description: product.description,
            discount: product.discountPercentage,
            price: product.price,
            brand: product.brand,
            category: product.category,
            rating: product.rating,
            image: product.thumbnail,
            
        }))
    } catch (e) {
        throw new Error('Error en la busqueda')
    }

}