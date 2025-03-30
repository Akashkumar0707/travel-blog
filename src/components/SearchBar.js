import { useContext } from 'react';
import { BlogContext } from '../context/BlogContext';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useContext(BlogContext);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search blogs..."
      />
      {searchTerm && (
        <button onClick={() => setSearchTerm('')} className="clear-search">
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;