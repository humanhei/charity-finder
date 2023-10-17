import { Routes, Route } from "react-router-dom";
import CharityDetail from "./pages/CharityDetails";
import Search from "./pages/Search"
import Favourites from "./pages/Favourites";
import Home from "./pages/Home";
import NavBar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";
import { useEffect, useState } from "react";


function App() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
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
  }, [url]);

  function handleUrl(url: string){
    setUrl(url)
  }
  
  return (
    <div>
        <Routes>
          <Route path="/" element={<NavBar />} errorElement={<ErrorPage />}>
            <Route index element={<Home />} />
            <Route path="/search" element={<Search onHandleUrl={handleUrl} isLoading={isLoading} data={data}/>} />
            <Route path="/charity/:id" element={<CharityDetail />} />
            <Route path="/favourties" element={<Favourites />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
    </div>
  )
}

export default App
