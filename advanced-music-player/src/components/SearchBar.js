import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search" onSubmit={handleSearch}>
      <input
        type="text"
        id="text"
        placeholder="Enter song name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button id="btn" type="submit">Search</button>
    </form>
  );
};

export default SearchBar;