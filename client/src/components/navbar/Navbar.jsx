import "./navbar.scss";
import {
  Notifications,
  Person,
  Search,
  ShoppingCart,
} from "@mui/icons-material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const [searchedItem,setSearchedItem] = useState("")

  const handleSearchItemInput = (e)=>{
    setSearchedItem(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/games", {
      state: {
        searchQuery: searchedItem,
      },
    });
  };

  const handleKey = (e)=>{
    if(e.key === "Enter"){
      handleSearch(e)
    }
  }

  return (
    <div className="navbarContainer h-20">
      <div className="left">
        <Link className="logoWrapper" to="/">
          <h1 className="logoLeft">TRACK</h1>
          <h1 className="logoRight">r</h1>
        </Link>
        <div className="navBarItemWrapper">
          <Link className="navBarItem" to="/games">
            <div>Games</div>
          </Link>
          <div className="navBarItem">Reviews</div>
        </div>
      </div>
      <div className="center">
          <form className="searchBarWrapper" onSubmit={handleSearch}>
            <Search className="searchIcon" onClick={handleSearch}/>
            <input
              type="text"
              className="searchBar"
              placeholder="search for your games"
              onKeyUp={handleKey}
              onChange={handleSearchItemInput}
            />
          </form>
      </div>
      <div className="right">
        <div className="navBarItemWrapper">
          <ShoppingCart className="navBarItem" />
          <Notifications className="navBarItem" />
          <Person className="navBarItem" />
        </div>
      </div>
    </div>
  );
};
