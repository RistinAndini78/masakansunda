import Layout from '../components/Layout';
import RecipeCard from '../components/RecipeCard';
import { useFavorites } from '../context/FavoritesContext';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function Favorites() {
    const { favorites, clearFavorites } = useFavorites();

    return (
        <Layout title="Resep Favorit - Dapur Sunda">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-secondary">Resep Favorit Anda</h1>
                {favorites.length > 0 && (
                    <button
                        onClick={clearFavorites}
                        className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold px-4 py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <TrashIcon className="w-5 h-5" />
                        Kosongkan Favorit
                    </button>
                )}
            </div>

            {favorites.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-400 mb-4">Belum ada resep favorit.</h2>
                    <p className="text-gray-500 mb-8">Jelajahi resep kami dan simpan yang Anda suka!</p>
                    <a href="/resep" className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition">
                        Jelajahi Resep
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favorites.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            )}
        </Layout>
    );
}
