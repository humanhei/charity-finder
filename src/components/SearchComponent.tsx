import { ChangeEvent, useState } from 'react';
import searchIcon from '../assets/search.svg'
import causesJson from '../assets/causes.json';

function SearchComponent() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<string[]>([]);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value);
        const results: string[] = causesJson.causes.filter((item: string) =>
            item.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setSearchResults(results);
    }

    function handleClick(text: string) {
        setSearchTerm(text);
    }

    return (
        <form action="/search" className='relative w-1/2'>
            <button type="submit" className='absolute inset-y-0 right-0 px-4'><img src={searchIcon} width={20} height={20} /></button>
            <input
                type="text"
                name="searchQuery"
                className="px-4 py-3 border border-gray-300 rounded-md w-full"
                placeholder="Find a charity"
                value={searchTerm}
                onChange={handleChange}
            />
              <div className="absolute z-10 mt-2  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                <div className="py-1" role="none">
                {searchResults.map((item, index) => (
                    <button className="m-4 p-4 rounded-lg hover:bg-sky-700 hover:text-white" key={index} onClick={() => handleClick(item)}>{item}</button>
                ))}
                </div>
            </div>
        </form>
    );
}

export default SearchComponent