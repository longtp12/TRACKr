import "./gameDetail.scss";
import { Navbar } from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { platformIcons } from "../../utils/platformIcons";
import {
  AddCircleOutlineOutlined,
  EditOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { GameCopiesDataGrid } from "../../components/gameCopiesDataGrid/GameCopiesDataGrid";
import { DetailCarousel } from "../../components/detailCarousel/DetailCarousel";
import { publicRequest } from "../../requestMethods";
import styled from "styled-components";
import { formatReleaseDate } from "../../utils/formatStrings";

const DetailContainer = styled.div`
  background-color: #151515;
  overflow: hidden;
  position: relative;
  background-image: url(${(props) => props.backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
`;

const GameDetail = () => {
  const slug = location.pathname.split("/")[2];

  const [gameDetail, setGameDetail] = useState();
  const [gameCopies, setGameCopies] = useState([]);

  // GET GAME'S DETAILS
  useEffect(() => {
    const getGame = async () => {
      try {
        const response = await publicRequest.get("/game/searchSlug/" + slug);
        setGameDetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGame();
  }, [slug]);

  // GET GAME COPIES
  useEffect(() => {
    const getGameCopies = async () => {
      try {
        const response = await publicRequest.post("/gameCopy/search", {
          title: gameDetail.title,
        });

        setGameCopies(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGameCopies();
  }, [gameDetail]);

  //  FILTER HTML OF DESCRIPTION
  const filterHTML = (html) => {
    const entityRegex = /&#39;/g;
    const tagRegex = /(<([^>]+)>)/gi;
    const quote = /&quot;/g;

    const filteredString = html
      .replace(entityRegex, "'")
      .replace(tagRegex, "")
      .replace(quote, '"');

    return filteredString;
  };

  // console.log(gameDetail);
  // console.log(gameCopies);
  return (
    <div>
      <Navbar />
      {gameDetail && (
        <DetailContainer backgroundImage={gameDetail.backgroundImage}>
          <div className="detailsContainer">
            <div className="bodyWrapper">
              <div className="bodyContent shadow-xl">
                <div className="details">
                  <div className="info">
                    <div className="infoWrapper">
                      <h1>{gameDetail.title}</h1>
                      <div className="sub">
                        <div className="releaseDate">
                          {formatReleaseDate(gameDetail.releaseDate)}
                        </div>
                        <div className="platforms">
                          {gameDetail.platforms.map((platform) => {
                            if (platform === "PlayStation")
                              return <img src={platformIcons.playstation} />;
                            if (platform === "Xbox")
                              return <img src={platformIcons.xbox} />;
                            if (platform === "Nintendo")
                              return <img src={platformIcons.switch} />;
                          })}
                        </div>
                      </div>
                      <div className="lowerLeft mt-7">
                        <div className="additionalInfo">
                          <div className="left">
                            <div className="infoItem">
                              Genres:
                              <div>
                                {gameDetail.genres.map((genre) => (
                                  <div>{genre}</div>
                                ))}
                              </div>
                            </div>
                            <div className="infoItem">
                              Developers:
                              <div>{gameDetail.developers[0]}</div>
                            </div>
                          </div>
                          <div className="right">
                            <div className="metaScore">
                              Metacritics:
                              <br />
                              <div className="score">
                                {gameDetail.metaScore}
                              </div>
                            </div>
                            <div className="infoItem">
                              Publishers:
                              <div>{gameDetail.publishers[0]}</div>
                            </div>
                          </div>
                        </div>
                        <div className="actions">
                          <button
                            style={{
                              backgroundColor: "#FFCD29",
                              color: "black",
                            }}
                            className="actionBtn"
                          >
                            <span>Add to wishlist</span>
                            <ShoppingCartOutlined />
                          </button>
                          <button
                            style={{
                              backgroundColor: "#14AE5C",
                              color: "white",
                            }}
                            className="actionBtn"
                          >
                            <span>Add to collection</span>
                            <AddCircleOutlineOutlined />
                          </button>
                          <button
                            style={{
                              backgroundColor: "#0D99FF",
                              color: "white",
                            }}
                            className="actionBtn"
                          >
                            <span>Write a review</span>
                            <EditOutlined />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="screenshots">
                      <DetailCarousel
                        screenshots={gameDetail.shortScreenshots}
                      />
                    </div>
                  </div>
                  <div
                    style={{ borderBottom: "3px solid gray", padding: "40px" }}
                  >
                    <div
                      className="description"
                      dangerouslySetInnerHTML={{
                        __html: gameDetail.description,
                      }}
                      style={{
                        padding: "20px",
                        fontSize: "20px",
                        backgroundColor: "black",
                      }}
                    ></div>
                  </div>
                </div>
                <div className="gameCopiesTableContainer">
                  <div className="gameCopiesTableWrapper">
                    <GameCopiesDataGrid gameCopies={gameCopies} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DetailContainer>
      )}
    </div>
  );
};

export default GameDetail;
