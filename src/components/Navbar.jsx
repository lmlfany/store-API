const Navbar = () => {
  return (
    <div >
      <nav className="bg-white border-gray-200 dark:bg-gray-800 "
                style={{ 
                  backgroundImage: "url('/fondo.png')",
                  backgroundRepeat: "repeat-x",
                  backgroundPosition: "center",
                  backgroundSize: "200px, auto, contain",
                   }}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4" >
          <div  className="flex items-center">
            <div className="flex md:order-2">
              <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center mr-4  justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <img src="/logo.svg" className="h-8" alt="Logo" />
              </button>
            </div>
            <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="/logoLarge.svg" className="h-8" alt="Logo" />
            </a>
          </div>
          <div className="flex items-center">
            <button className="text-white mr-4">
              <img src="/profile.svg" alt="Perfil" className="w-6 h-6" />
            </button>
            <button className="text-white mr-4">
              <img src="/cart.svg" alt="Carrito" className="w-6 h-6" />
            </button>
            <button className="text-white">
              <img src="/notify.svg" alt="Notificaciones" className="w-8 h-8" />
            </button>
          </div>
        </div>
      </nav>
    </div>

  );
};

export default Navbar;