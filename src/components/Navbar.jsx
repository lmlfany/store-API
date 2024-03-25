const Navbar = () => {
  return (
    <div >
      <nav className="bg-white border-gray-200 dark:bg-gray-800 h-[60px]  content-center"
                style={{ 
                  backgroundImage: "url('/fondo.png')",
                  backgroundRepeat: "repeat-x",
                  backgroundPosition: "top left",
                  backgroundSize: "140px, auto, contain",
                   }}>
        <div className="max-w-screen-xl flex flex-row items-center justify-between mx-auto p-3" >
          <div className="flex flex-row gap-3 items-center">
            <div className="flex md:order-2" >
              <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <img src="/logo.svg" className="h-[34px]" alt="Logo" />
              </button>
            </div>
            <div class="inline-block h-[60px] w-[0.5px] self-stretch bg-white" />          
            <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="/logoLarge.svg" className="h-8" alt="Logo" />
            </a>
          </div>
          <div className="flex items-center gap-2">
          <div class="inline-block h-[60px] w-[0.5px] self-stretch bg-black" /> 
            <button className="text-white ">
              <img src="/profile.svg" alt="Perfil" className="w-[36px] h-[36px]" />
            </button>
            <div class="inline-block h-[60px] w-[0.5px] self-stretch bg-black" /> 
            <button className="text-white">
              <img src="/cart.svg" alt="Carrito" className="w-[37px] h-[37px]" />
            </button>
            <div class="inline-block h-[60px] w-[0.5px] self-stretch bg-black" /> 
            <button className="text-white">
              <img src="/notify.svg" alt="Notificaciones" className="w-[44px] h-[44px]" />
            </button>
          </div>
        </div>
      </nav>
    </div>

  );
};

export default Navbar;