import homeImg from '../assets/home.jpg'

function Home() {
    return (
        <div id="home-page">
            <div className="flex relative items-center justify-between h-[calc(100vh-100px)]">
                <h1 className="absolute text-7xl font-extrabold right-0 px-8">Start searching <br /> your charity</h1>
                <img className="h-full object-cover" src={homeImg} />
            </div>
        </div>
    );
}

export default Home