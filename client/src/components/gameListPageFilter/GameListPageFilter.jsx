import React from "react";
import "./gameListPageFilter.scss";
import { formatPrice } from "../../utils/formatStrings";

export const GameListPageFilter = () => {
  return (
    <div className="gameListPageFilterContainer">
      <h3 className="filterTitle">Filters</h3>
      <div className="filterByPriceWrapper">
        <h3>Price</h3>
        <div className="checkboxFilter">
          <input className=" mr-3" type="checkbox" />
          <label className="checkboxLabel" htmlFor="">Under {formatPrice(1000000)}</label>
        </div>
        <div className="checkboxFilter">
          <input className=" mr-3" type="checkbox" />
          <label className="checkboxLabel" htmlFor="">
            {formatPrice(1000000)} - {formatPrice(1500000)}
          </label>
        </div>
        <div className="checkboxFilter">
          <input className=" mr-3" type="checkbox" />
          <label className="checkboxLabel" htmlFor="">Over {formatPrice(1500000)}</label>
        </div>
      </div>
    </div>
  );
};
