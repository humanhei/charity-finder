import { Link, Outlet } from 'react-router-dom'
import heart from '../assets/red-heart.svg'
import SearchComponent from './SearchComponent';

function NavBar() {
  return (
    <>
      <header className="flex w-full bg-gray-700 p-5 justify-between place-items-center">
        <Link to="/"><h3 className="text-xl text-white font-bold">Charity Finder</h3></Link>
        <SearchComponent />
        <Link to="/favourties"><button type="button" className='bg-white rounded-full p-3 items-center hover:bg-slate-400 duration-300'><img src={heart} width={20} height={20} /></button></Link>
      </header>
      <Outlet />
    </>
  );
}

export default NavBar