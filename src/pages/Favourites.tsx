import { useEffect, useState } from "react";
import CharityListComponent from "../components/CharityListComponent";
import { charityData } from "../interface/charityData.interface";

function Favourites() {
  const [favList, setFavList] = useState(Array<charityData>);
  useEffect(() => {
    const currFavList = localStorage.getItem('charityFavList');
    if (currFavList) {
      setFavList(JSON.parse(currFavList));
    }
  }, []);
  return (
    <div id="fav-page">
      <h1 className="text-3xl font-bold text-center">Favourite Charity List</h1>

      {
        favList.length > 0
          ? <div className="grid w-full justify-items-center grid-cols-1 gap-10 px-6 sm:grid-cols-1 lg:grid-cols-3">
              { favList.map((item) => (<CharityListComponent key={item.slug} name={item.name} logoUrl={item.logoUrl} />)) }
            </div>
          : <div className="grid justify-items-center">
              <span className="p-6 text-xl font-semibold text-gray-400">No Favorites Charity</span>
            </div>
      }
    </div>
  );
}

export default Favourites