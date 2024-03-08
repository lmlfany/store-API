import './App.css';
import Navbar from './components/Navbar.jsx';
import { useProducts } from './hooks/useProducts.js';
import { Products } from './components/Products.jsx';
import { useEffect, useState, useRef } from 'react';

function useSearch (){
  const [search, updateSearch] = useState('');
  const [error, setError] = useState (null);
  const isFirstInput = useRef(true);

  useEffect(()=>{
    if(isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }

    if(search === '') {
      setError('No se puede buscar producto vacio');
      return;
    }
  
    if(search.match(/^\d+$/)){
      setError('No se puede buscar por número');
      return;
    }
  
    if(search.length < 3 ){
      setError('Debe contener al menos 3 letras');
      return;
    } 
  
    setError(null);
  }, [search])

  return { search, updateSearch, error}
}


function App() {
  const { search, updateSearch, error } = useSearch();
  const { products, loading, getProducts } = useProducts({search});
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsHeaderFixed(currentScrollPos > 10); // Cambia aquí el valor según lo que necesites
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);;


  const handleSubmit = (event) => {
    event.preventDefault();
    getProducts();
  }

  const handleChange = (event) => {
    updateSearch(event.target.value);
  }


  return (
<div style={{ backgroundColor: '#E3E9EE' }}>
  <header
    className='' 
    style={{ 
      backgroundColor: '#E3E9EE',
      position: isHeaderFixed ? 'fixed' : 'relative', width: '100%', zIndex: 9999 }}>
    {!isHeaderFixed && <Navbar />}
    <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
      <form onSubmit={handleSubmit} className="w-full flex items-center justify-center">
        <div className="relative w-full max-w-xl flex"> 
          <div className="relative w-full flex items-center"> 
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"> 
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input 
              style={{ border: '1px solid transparent', borderColor: error ? 'red' :'transparent' }} 
              onChange={handleChange} 
              value={search}  
              className="w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " 
              placeholder="Buscar producto" 
            />
            <div className="flex items-center pr-3"> 
              <img src="/scan.svg" className="h-8" alt="Logo" />
            </div>
          </div>
          <button type="submit" className="ml-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
        </div>
      </form>
      <div className='w-full flex items-center justify-center'>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <a> Filtros </a>
      </div>
    </div>
  </header>
  <main className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
    {loading ? <p>Cargando...</p> : <Products products={products} />}
  </main>
</div>
  )
}

export default App;
