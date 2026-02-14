import Layout from '../../components/Layout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useFavorites } from '../../context/FavoritesContext';
import { mapToSunda } from '../../utils/sundaMapping';
import {
    ClockIcon,
    FireIcon,
    StarIcon,
    UserGroupIcon,
    HeartIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

export default function RecipeDetail({ recipe }) {
    const router = useRouter();
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();

    if (router.isFallback) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (!recipe) return <div className="text-center py-20">Resep tidak ditemukan via URL detail.</div>;

    const favored = isFavorite(recipe.id);
    const toggleFavorite = () => {
        if (favored) {
            removeFavorite(recipe.id);
        } else {
            addFavorite(recipe);
        }
    };

    return (
        <Layout title={`${recipe.name} - Dapur Sunda`}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative h-96 w-full">
                    <Image
                        src={recipe.image}
                        alt={recipe.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">{recipe.name}</h1>
                        <div className="flex flex-wrap gap-4 text-sm font-semibold">
                            {recipe.tags?.map(tag => (
                                <span key={tag} className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex justify-between items-center bg-orange-50 p-6 rounded-xl border border-orange-100">
                            <div className="text-center">
                                <ClockIcon className="w-8 h-8 text-primary mx-auto mb-2" />
                                <p className="text-xs text-gray-500 uppercase font-bold">Waktu</p>
                                <p className="font-bold text-gray-800">{recipe.prepTimeMinutes + recipe.cookTimeMinutes} mnt</p>
                            </div>
                            <div className="text-center border-l border-orange-200 pl-6">
                                <FireIcon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                                <p className="text-xs text-gray-500 uppercase font-bold">Kesulitan</p>
                                <p className="font-bold text-gray-800">{recipe.difficulty}</p>
                            </div>
                            <div className="text-center border-l border-orange-200 pl-6">
                                <StarIcon className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                                <p className="text-xs text-gray-500 uppercase font-bold">Rating</p>
                                <p className="font-bold text-gray-800">{recipe.rating} / 5</p>
                            </div>
                            <div className="text-center border-l border-orange-200 pl-6">
                                <UserGroupIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                <p className="text-xs text-gray-500 uppercase font-bold">Porsi</p>
                                <p className="font-bold text-gray-800">{recipe.servings} Org</p>
                            </div>
                        </div>

                        <div className="bg-white ">
                            <h2 className="text-2xl font-bold text-secondary mb-4 pb-2 border-b border-gray-100">Bahan-Bahan</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {recipe.ingredients?.map((ing, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                                        <span className="w-2 h-2 mt-2 bg-primary rounded-full flex-shrink-0"></span>
                                        {ing}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-secondary mb-4 pb-2 border-b border-gray-100">Cara Membuat</h2>
                            <ol className="space-y-6">
                                {recipe.instructions?.map((step, idx) => (
                                    <li key={idx} className="flex gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                                            {idx + 1}
                                        </span>
                                        <p className="text-gray-700 mt-1 leading-relaxed">{step}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg sticky top-24">
                            <button
                                onClick={toggleFavorite}
                                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${favored
                                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                        : 'bg-primary text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
                                    }`}
                            >
                                {favored ? (
                                    <>
                                        <HeartSolidIcon className="w-6 h-6" />
                                        Telah Difavoritkan
                                    </>
                                ) : (
                                    <>
                                        <HeartIcon className="w-6 h-6" />
                                        Tambah ke Favorit
                                    </>
                                )}
                            </button>

                            <div className="mt-8">
                                <h3 className="font-bold text-gray-800 mb-4">Tentang Hidangan</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {recipe.description}
                                    <br /><br />
                                    Nikmati cita rasa asli {recipe.isSunda ? 'Sunda' : 'Nusantara'} yang otentik.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

// Server Side Rendering for Details to ensure fresh data and valid mapping
export async function getServerSideProps(context) {
    const { id } = context.params;
    try {
        const res = await fetch(`https://dummyjson.com/recipes/${id}`);
        if (!res.ok) {
            return { notFound: true };
        }
        const data = await res.json();

        // Map to Sunda
        // Note: we can map singular recipe too using our logic
        // But mapToSunda expects full list iteration to find matching ID in sundaMapping list?
        // No, mapToSunda takes a single apiRecipe and checks if its ID exists in sundaRecipes array.
        // So this works perfectly.
        const mapped = mapToSunda(data);

        // If it returns null (not in our valid sunda list), we might want to return it as is or 404?
        // For this demo, since users might click "Lihat Detail" on a card that WAS mapped, it should work.
        // If they manually type a URL for an ID that is NOT in our mapped list, we can show standard recipe or 404.
        // Let's show standard recipe if not mapped, but logically we only link to mapped ones.

        const finalRecipe = mapped || { ...data, isSunda: false };

        return {
            props: {
                recipe: finalRecipe,
            },
        };
    } catch (e) {
        return { notFound: true };
    }
}
