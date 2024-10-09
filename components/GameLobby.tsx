import { FC } from "react";
import Navbar from "./Navbar";
import GameList from "./GameList";
import styles from "../styles/lobby.module.scss";

interface Props {
  categories: { id: string; name: string }[];
  onCategoryClick: (categoryId: string) => void;
}

const GameLobby: FC<Props> = ({ categories, onCategoryClick }) => {
  return (
    <div className={styles.lobbyContainer}>
      <Navbar categories={categories} onCategoryClick={onCategoryClick} />
      <GameList />
    </div>
  );
};

export default GameLobby;
