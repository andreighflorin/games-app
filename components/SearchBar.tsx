import { useState } from "react";
import styles from "../styles/searchBar.module.scss";

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSearchQuery(newQuery);
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search games..."
      />
    </div>
  );
};

export default SearchBar;
