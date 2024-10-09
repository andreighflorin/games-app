import { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import SearchBar from "./SearchBar";
import styles from "../styles/lobby.module.scss";

const GameList = () => {
  const { games, status } = useSelector((state: RootState) => state.games);
  const [searchQuery, setSearchQuery] = useState(""); // store the search query

  if (status === "loading") {
    return <div className={styles.center}>Loading games...</div>;
  }

  // Filter games based on the search query
  const filteredGames = games.filter((game) =>
    game.gameText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.gamesList}>
      <SearchBar setSearchQuery={setSearchQuery} />
      {filteredGames.length ? (
        <div className={styles.gameGrid}>
          {filteredGames.map((game) => (
            <div key={game.id} className={styles.gameTile}>
              <Image
                src={game.image.thumbnail.src}
                alt={game.image.alt}
                width={300}
                height={169}
                className={styles.gameImage}
                priority
              />
              <h3 className={styles.gameTitle}>{game.gameText}</h3>
              <p className={styles.provider}>{game.provider}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.center}>No games available.</div>
      )}
    </div>
  );
};

export default GameList;
