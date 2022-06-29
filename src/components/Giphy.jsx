import React, { useEffect, useState } from "react";
import axios from "axios";

import Loader from "./Loader";
import Paginate from "./Paginate";

const Giphy = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const LastItemIndex = currentPage * itemsPerPage;
  const FirstItemIndex = LastItemIndex - itemsPerPage;
  const currentItems = data.slice(FirstItemIndex, LastItemIndex);
  const loadGifs = () => {
    if (Loading) {
      return <div className=""><Loader/><br/>Loading...</div>;
    }
    return currentItems.map(element => {
      return (
        <div key={element.id} className="gif">
          <img src={element.images.fixed_height.url} />
        </div>
      );
    });
  };
  const renderError = () => {
    if (Error) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Unable to fetch data, please check your internet connection!
        </div>
      );
    }
  };

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setError(false);
    setLoading(true);

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "jXQbU6Cv0yliF9WJbpqL4SxlRd86e7W0",
          q: search,
          limit: 100
        }
      });
      setData(results.data.data);
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 4000);
    }

    setLoading(false);
  };

  const pageSelected = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="m-2">
      {renderError()}

      <h1>Giphy Search Interface</h1>
      <p>Developed for coding test @ MindAtlas</p>
      <form className="form-inline justify-content-center m-2">
        <input
          value={search}
          onChange={handleSearchChange}
          type="text"
          placeholder="Enter theme here..."
          className="form-control"
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary mx-2"
        >
          Search Giphy!
        </button>
      </form>

      
      <Paginate
        pageSelected={pageSelected}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
      />
      <div className="container gifs">{loadGifs()}</div>
    </div>
  );
};

export default Giphy;