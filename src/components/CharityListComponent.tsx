import charityLogo from '../assets/charity_logo.png'

interface CharityDisplayProps {
  name: string;
  logoUrl: string;
}

function CharityListComponent({ name, logoUrl} : CharityDisplayProps) {
  return (
    <>
      <a className="mt-5 px-5 py-5 w-full rounded-md bg-white shadow-lg hover:bg-[#FBFBFB]" href={`/charity/${name}`}>
      <span className="flex items-center text-lg font-semibold">
        <img className="mr-3 rounded-full w-12 h-12" src={logoUrl ? logoUrl : charityLogo} />{name}
      </span>
      </a>

    </>
    
  );
}

export default CharityListComponent