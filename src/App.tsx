import { Routes, Route } from "react-router-dom";
import CharityDetail from "./pages/CharityDetails";
import Search from "./pages/Search"
import Favourites from "./pages/Favourites";
import Home from "./pages/Home";
import NavBar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<NavBar />} errorElement={<ErrorPage />}>
            <Route index element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/charity/:id" element={<CharityDetail />} />
            <Route path="/favourties" element={<Favourites />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
    </div>
  )
}

export default App
