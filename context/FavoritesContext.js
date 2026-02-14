import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('dapurSundaFavorites');
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    // Save to localStorage whenever favorites change
    useEffect(() => {
        localStorage.setItem('dapurSundaFavorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (recipe) => {
        setFavorites((prev) => {
            if (prev.find((r) => r.id === recipe.id)) return prev;
            return [...prev, recipe];
        });
    };

    const removeFavorite = (id) => {
        setFavorites((prev) => prev.filter((r) => r.id !== id));
    };

    const clearFavorites = () => {
        setFavorites([]);
    };

    const isFavorite = (id) => {
        return favorites.some((r) => r.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorites, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}
