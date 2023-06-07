import "./navbar.scss";
import {
  Notifications,
  Person,
  Search,
  ShoppingCart,
} from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
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
        <div className="searchBarWrapper">
          <Search className="searchIcon" />
          <input
            type="text"
            className="searchBar"
            placeholder="search for your games"
          />
        </div>
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
