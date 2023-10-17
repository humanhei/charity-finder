import { useSearchParams } from 'react-router-dom'
import { charityData } from "../interface/charityData.interface";
import CharityListComponent from "../components/CharityListComponent";
import { useEffect, useState, } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

function Search() {
  const [data, setData] = useState(Array<charityData>)
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('searchQuery');

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `${apiUrl}${searchQuery}?apiKey=${apiKey}`;
        console.log(url);
        const result = await fetch(url);
        const body = await result.json();
        setData(body.nonprofits);
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false);
      }
    }
    fetchData()
  }, [searchQuery]);

  return (
    <div id="charity-list-page">
      <h1 className="text-3xl font-bold text-center">Charity List for {searchQuery}</h1>
      {
        isLoading
          ? <div className="grid justify-items-center">
            <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          <div className="grid w-full justify-items-center grid-cols-1 gap-10 px-6 sm:grid-cols-1 lg:grid-cols-3">
            {data.length > 0
              ? data.map((item) => (<CharityListComponent key={item.slug} name={item.name} logoUrl={item.logoUrl} />))
              : <div className="grid justify-items-center">
                  <span className="p-6 text-xl font-semibold text-gray-400">No Charity found</span>
                </div>
            }
          </div>


      }
    </div>
  );
}

export default Search