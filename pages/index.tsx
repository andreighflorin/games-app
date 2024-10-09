import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchGames } from "../store/gamesSlice";
import GameLobby from "../components/GameLobby";

interface Category {
  id: string;
  name: string;
  links: {
    getPage: string;
  };
}

interface HomeProps {
  categories: Category[];
}

const Home = ({ categories }: HomeProps) => {
  const dispatch: AppDispatch = useDispatch();

  // Fetch all games on component mount
  useEffect(() => {
    const allGamesEndpoint =
      "https://casino.api.pikakasino.com/v1/pika/pages/en/casino/all-games";
    dispatch(fetchGames(allGamesEndpoint));
  }, [dispatch]);

  const handleCategoryClick = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId); // Find the selected category
    if (category) {
      dispatch(fetchGames(category.links.getPage));
    }
  };

  return (
    <GameLobby categories={categories} onCategoryClick={handleCategoryClick} />
  );
};

export const getServerSideProps = async () => {
  try {
    const res = await fetch(
      "https://casino.api.pikakasino.com/v1/pika/en/config/"
    );

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();
    const categories = data.menu?.lobby?.items || [];

    return {
      props: {
        categories,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { notFound: true };
  }
};

export default Home;
