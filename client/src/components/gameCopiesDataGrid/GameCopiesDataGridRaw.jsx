import { publicRequest } from "../../utils/requestMethods";
import "./gameCopiesDataGridRaw.scss";
import { Modal } from "../modal/Modal";
import { formatPrice } from "../../utils/formatStrings";
import { platformIcons } from "../../utils/platformIcons";

import React, { useEffect, useState } from "react";
import {
  ArrowBackIos,
  ArrowBackIosNew,
  ArrowForwardIos,
  NavigateNext,
} from "@mui/icons-material";

export const GameCopiesDataGridRaw = ({ title }) => {
  const [gameCopies, setGameCopies] = useState();
  const [page, setPage] = useState(1);

  const getGameCopies = async () => {
    try {
      const response = await publicRequest.post(
        `/gameCopy/search?gameCopiesPerPage=15&page=${page}`,
        {
          title: title,
        }
      );
      setGameCopies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPagination = () => {
    setPage((prev) => prev + 1);
  };
  const handlePrevPagination = () => {
    setPage((prev) => prev - 1);
  };

  const renderPlatformImg = (platform) => {
    if (platform === "ps3" || platform === "ps2" || platform === "psVita") {
      const imgUrl = platformIcons.playstation;
      return <img className="platformLargeIcon" src={imgUrl} />;
    }
    if (platform === "ps5" || platform === "ps5Old") {
      const imgUrl = platformIcons.ps5;
      return <img className="platformSmallIcon" src={imgUrl} />;
    }
    if (platform === "ps4" || platform === "ps4Old") {
      const imgUrl = platformIcons.ps4;
      return <img className="platformSmallIcon" src={imgUrl} />;
    }
    if (platform === "xbox") {
      const imgUrl = platformIcons.xbox;
      return <img className="platformLargeIcon" src={imgUrl} />;
    }
    if (platform === "switch" || platform === "switchOld") {
      const imgUrl = platformIcons.switch;
      return <img className="platformLargeIcon" src={imgUrl} />;
    }
  };

  useEffect(() => {
    getGameCopies();
  }, [title, page]);

  console.log(gameCopies);
  console.log(page);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="storeTable">Store</th>
            <th className="platformTable">Platform</th>
            <th>Current Price</th>
            <th>Original Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {gameCopies ? (
            gameCopies.map((gameCopy) => (
              <tr key={gameCopy._id}>
                <td>
                  <a target="_blank" href={gameCopy.link}>
                    {gameCopy.storeName}
                  </a>
                </td>
                <td>{renderPlatformImg(gameCopy.platform)} </td>
                <td>
                  <a target="_blank" href={gameCopy.link}>
                    {formatPrice(gameCopy.retailPrice[0].price)}
                  </a>
                </td>
                <td>
                  <a target="_blank" href={gameCopy.link}>
                    {formatPrice(
                      !gameCopy.originalPrice
                        ? gameCopy.retailPrice[gameCopy.retailPrice.length - 1]
                            .price
                        : gameCopy.originalPrice
                    )}
                  </a>
                </td>
                <td>
                  <Modal priceData={gameCopy.retailPrice} />
                </td>
              </tr>
            ))
          ) : (
            <div>loading</div>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button
          disabled={page === 1}
          className="paginationButton"
          onClick={handlePrevPagination}
        >
          <ArrowBackIosNew />
        </button>
        <div className="w-9 text-center">{page}</div>
        <button
          disabled={gameCopies?.length < 15}
          className="paginationButton"
          onClick={handleNextPagination}
        >
          <ArrowForwardIos />
        </button>
      </div>
    </div>
  );
};
