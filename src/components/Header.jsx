const Header = () => {
  const navItems = [
    {
      item: "Home",
    },
    {
      item: "Filmes",
    },
    {
      item: "Series",
    },
  ];
  return (
    <header className="w-full h-[140px] bg-black opacity-75 flex justify-between items-center px-10 fixed top-0 left-0 z-50">
      <div>
        <img
          src="src/assets/FILMFLIX.svg"
          alt="Logo"
          className="lg:w-[224px] lg:h-[73px] w-[94px] "
        />
      </div>
      <nav>
        <ul className="hidden lg:flex lg:gap-10">
          {navItems.map((navItem) => (
            <li key={navItem.item} className="lg:text-[30px] lg:text-[#878787]">
              {navItem.item}
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <img
          src="src/assets/User.svg"
          alt=""
          className="w-[40px] h-[40px] lg:w-[81px] lg:h-[81px]"
        />
      </div>
    </header>
  );
};

export default Header;
