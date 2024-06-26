import './App.css';
import Navbar from './components/Navbar.jsx';
import { Link } from 'react-router-dom';
import { useProducts } from './hooks/useProducts.js';
import { Products } from './components/Products.jsx';
import { useEffect, useState, useRef, useCallback } from 'react';
import debounce from 'just-debounce-it';
import FilterItem from './components/FilterItem.jsx';

function useSearch (){
  const [search, updateSearch] = useState('');
  const [error, setError] = useState (null);
  const [hasInput, setHasInput] = useState(false);
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
  
    if(search.length < 5 ){
      setError('Debe contener al menos 5 letras');
      return;
    } 
  
    setError(null);
  }, [search]);

  useEffect(() => {
    setHasInput(search.length > 0); 
  }, [search]);

  return { search, updateSearch, error, hasInput, setHasInput }
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error, hasInput, setHasInput } = useSearch();
  const { products, loading, getProducts } = useProducts({search, sort});
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [showFilter, setShowFilter] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsHeaderFixed(currentScrollPos > 10); 
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);;

  useEffect(() => {

    getProducts({ search: '' });
  }, []); 

  const debounceGetProducts = useCallback(
    debounce(search => {
    getProducts({search});
  }, 300), [getProducts]);


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      updateSearch(event.target.value); 
      event.target.blur(); 
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getProducts({ search });
    event.target.querySelector('input').blur(); 
  }

  const handleSort = () => {
    setSort(!sort);
  }


  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debounceGetProducts(newSearch);
  }

  const handleClearSearch = () => {
    updateSearch('');
    setHasInput(false); 
    setSort(false); 
    setTimeout(() => {
      getProducts({ search: '', sort: false }); 
    }, 0);
  }

  const handleFilter = () => {
    setShowFilter(true)
  }

  function handleFilterClose() {
    setShowFilter(false);
    setSort(false); 
  }


  return (
  <div style={{ backgroundColor: '#E3E9EE' }}>

    <header
      style={{ 
      backgroundColor: '#E3E9EE',
      position: isHeaderFixed ? 'fixed' : 'relative', width: '100%', 
      zIndex: 9999 
      }}>
      {!isHeaderFixed && <Navbar />}
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 pt-4'>
        <form onSubmit={handleSubmit} className="w-full flex items-center justify-center">
          <label  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Buscar</label>
          <div className="relative w-full max-w-xl flex"> 
            <div className="relative w-full flex items-center"> 
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"> 
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input 
                style={{ border: '1px solid transparent', borderColor: error ? 'red' :'grey' }} 
                onKeyDown={handleKeyDown}
                onChange={handleChange} 
                value={search}  
                className=" block w-full p-4 ps-10 text-md text-gray-900 border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " 
                placeholder="Buscar producto" 
              />
              {hasInput ? (
                  <button
                  onClick={handleClearSearch}
                  className='absolute w-[26px] h-[26px] place-items-center text-blue-gray-500 top-2/4 right-2 -translate-y-2/4'
                >
                  <img src='/x-circle-solid.svg' className='h-6' alt='Clear' />
                </button>
              ):(
                <Link rel="preload" to="/scanner">
                <button 
                className='absolute w-8 h-8 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4'>
                  <img src='/scan.svg' className='h-[30px]' alt='Scan' />
                </button>
                </Link>
              )}
            </div>
            <button type="submit" className="hidden bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button>
          </div>
        </form>
        <div className="w-[570px] flex mx-auto flex-col pt-2">
          <div className="flex flex-row-reverse justify-between content-center">
            <a onClick={handleFilter} className='underline text-sm font-medium text-blue-500'>Filtros</a>
            {error && <p style={{ color: 'red' }} className=' text-sm font-semibold' >{error}</p>}
          </div>
          <div className="w-full items-center pt-2">
          {showFilter && (
            <div className="pb-3">
            <div className="bg-white rounded-sm p-2">
              <div className=" grid md:grid-cols-5 grid-cols-4 gap-8 h-full p-1">
                <FilterItem onChange={handleSort} checked={sort } filter={"Precio "}/>
                {/* <FilterItem onChange={handleSortAZ} checked={sortAZ} filter={"AZ"}/> */}
              </div>
              <div className="flex flex-row-reverse text-sm font-medium text-red-700 underline me-2">
                <a onClick={handleFilterClose}>Cerrar filtros</a>
              </div>  
            </div>
            </div>
          )}      
          </div>
        </div>
      </div>
      {isHeaderFixed && <hr className="h-[2px] bg-blue-400 border-0 " /> }
    </header>
    <main className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 p-2'>
    {loading ? <p>Cargando...</p> : <Products products={products} />}
      
    </main>
  </div>
  )
}

export default App;
