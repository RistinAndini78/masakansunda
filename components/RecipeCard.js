import Image from 'next/image';
import Link from 'next/link';
import { useFavorites } from '../context/FavoritesContext';
import { HeartIcon, ClockIcon, FireIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

export default function RecipeCard({ recipe }) {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const favored = isFavorite(recipe.id);

    const toggleFavorite = (e) => {
        e.preventDefault(); // Prevent link navigation if inside a Link
        if (favored) {
            removeFavorite(recipe.id);
        } else {
            addFavorite(recipe);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 transform border border-orange-100">
            <div className="relative h-48 w-full">
                <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 right-2">
                    <button
                        onClick={toggleFavorite}
                        className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
                        title={favored ? "Hapus dari Favorit" : "Tambah ke Favorit"}
                    >
                        {favored ? (
                            <HeartSolidIcon className="w-6 h-6 text-red-500" />
                        ) : (
                            <HeartIcon className="w-6 h-6 text-gray-500 hover:text-red-500" />
                        )}
                    </button>
                </div>
                {recipe.isSunda && (
                    <div className="absolute top-2 left-2 bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded-md backdrop-blur-md">
                        Khas Sunda
                    </div>
                )}
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1" title={recipe.name}>{recipe.name}</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                        <StarIcon className="w-4 h-4 fill-current" />
                        <span className="text-sm font-semibold">{recipe.rating}</span>
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">{recipe.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4 bg-orange-50 p-2 rounded-lg">
                    <span className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mnt
                    </span>
                    <span className="flex items-center gap-1">
                        <FireIcon className="w-4 h-4" />
                        {recipe.difficulty}
                    </span>
                </div>

                <Link
                    href={`/resep/${recipe.id}`}
                    className="block w-full text-center bg-primary text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    Lihat Detail
                </Link>
            </div>
        </div>
    );
}
