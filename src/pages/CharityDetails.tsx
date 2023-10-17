import { useParams } from "react-router-dom";
import { charityData } from "../interface/charityData.interface";
import { useState, useEffect } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

function CharityDetail() {
  const [charity, setCharity] = useState<charityData>({
    name: '',
    profileUrl: '',
    description: '',
    logoUrl: '',
    slug: '',
    coverImageUrl: '',
    tags: [],
  }
  );
  const [isFav, setIsFav] = useState(false);
  const { id } = useParams();
  const url = `${apiUrl}/${id}?apiKey=${apiKey}`;
  

  useEffect(() => {
    const currFavList = localStorage.getItem('charityFavList');
    if (currFavList){
      const favList = JSON.parse(currFavList);
      if (favList.find((item: charityData) => item.name === id)){
        setIsFav(true);
      }
    }
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch(url);
        const body = await result.json();
        setCharity(body.nonprofits[0]);
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [url]);

  function handleAddFav(charity: charityData) {
    const currFavList = localStorage.getItem('charityFavList');
    let favList = [];
    if (currFavList){
      favList = JSON.parse(currFavList);
      favList.push(charity);
    } else {
      favList = [charity];
    }
    localStorage.setItem("charityFavList", JSON.stringify(favList));
    setIsFav(true);
  }

  function handleDeleteFav() {
    const currFavList = localStorage.getItem('charityFavList');
    if (currFavList){
      const favList = JSON.parse(currFavList);
      const updatedFavList = favList.filter((item : charityData) => item.name !== id);
      localStorage.setItem("charityFavList", JSON.stringify(updatedFavList));
    }
    setIsFav(false);
  }

  return (
    <div id="charity-detail-page">
      <div className="container justify-center mb-8 px-4 grid grid-cols-1 gap-8 mx-auto sm:grid-cols-1 md:grid-cols-3 mt-10">
        <div className="col-span-2 rounded-md shadow-md">
          <div><img className="rounded-t-lg" src={charity.coverImageUrl} /></div>
          <div className="p-8">
            <h1 className="flex flex-wrap justify-center items-center text-3xl tracking-wide font-semibold text-gray-800 md:justify-normal">
              <img className="mr-3 mb-3 rounded-full md:mb-0" src={charity.logoUrl} />{charity.name}</h1>
            <div className="w-full">
              <p className="text-fit">{charity.description}...</p>
            </div>
          </div>
        </div>
        <div className="p-6 col-span-2 h-fit rounded-md shadow-md md:col-span-1">
          <div>
            { isFav
              ? <button className="w-full bg-[#2D59AF] rounded-sm py-4 text-white font-bold hover:bg-[#0F3D97] duration-300" onClick={() => handleDeleteFav()}>Remove from favorites</button>
              : <button className="w-full bg-[#F14040] rounded-sm py-4 text-white font-bold hover:bg-[#D31616] duration-300" onClick={() => handleAddFav(charity)}>Add to favorites</button>
            }
          </div>
          <div className="mt-4">
            <a href={charity.profileUrl} target="_blank">
              <button className="w-full bg-emerald-800 rounded-sm py-4 text-white font-bold hover:bg-emerald-950 duration-300">Check it in Every.org</button>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}

export default CharityDetail