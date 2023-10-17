import homeImg from '../assets/home.jpg'

function Home() {
    return (
        <div id="home-page">
            <div className="flex items-center justify-between px-8 h-[calc(100vh-100px)]">
                <h1 className="text-7xl font-extrabold">Start searching <br /> your charity</h1>
                <img className="h-full object-cover z-0" src={homeImg} />
            </div>
        </div>
    );
}

export default Home