import { useLocalStorage } from "./useLocalStorage";

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<string[]>("holyplace-favorites", []);

  const isFavorite = (path: string) => favorites.includes(path);

  const toggleFavorite = (path: string) => {
    setFavorites((prev) => (prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]));
  };

  return { favorites, isFavorite, toggleFavorite };
}
