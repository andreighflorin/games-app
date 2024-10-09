import { FC, useState } from "react";
import styles from "../styles/navbar.module.scss";

interface Props {
  categories: { id: string; name: string }[];
  onCategoryClick: (categoryId: string) => void;
}

const Navbar: FC<Props> = ({ categories, onCategoryClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.bars}>
        <button onClick={toggleMenu}>
          <i></i>
        </button>
      </div>
      <nav className={`${styles.navbar} ${isOpen ? styles.show : ""}`}>
        <div className={styles.closeNav}>
          <button onClick={toggleMenu}>×</button>
        </div>
        <ul>
          {categories
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((category) => (
              <li
                key={category.id}
                onClick={() => onCategoryClick(category.id)}
              >
                {category.name}
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
