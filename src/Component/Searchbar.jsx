import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

export const Searchbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchKeyword, setKeyword] = useState('');

  const searchHandler = (e) => {
    e.preventDefault();
    const trimmedKeyword = searchKeyword.trim();
    if (trimmedKeyword) {
      navigate(`/search/${trimmedKeyword}`);
    }
  };

  const ClearKeyword = () => {
    setKeyword('');
  };

  useEffect(() => {
    if (location.pathname === '/') {
      ClearKeyword();
    }
  }, [location]);


  return (
    <div>
      <form className="d-flex searcher" onSubmit={searchHandler}>
        <div className="input-group">
          <input
            type="search"
            id="search"
            className="form-control"
            placeholder="Enter the Product Name....."
            onChange={(e) => setKeyword(e.target.value)}
            value={searchKeyword}
            aria-label="Search"
          />
          <button className="btn btn-outline-light bg-danger" type="submit">
            <FaSearch />
          </button>
        </div>
      </form>
    </div>
  );
};
