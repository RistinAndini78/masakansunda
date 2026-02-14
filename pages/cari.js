import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import RecipeCard from '../components/RecipeCard';
import { getSundaRecipes } from '../utils/sundaMapping';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search() {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Client Side Rendering logic
    useEffect(() => {
        // Debounce search or fetch initial
        const fetchRecipes = async () => {
            setLoading(true);
            setError(null);
            try {
                // In a real scenario with proper API matching, we would query the API.
                // But since we are mapping arbitrary IDs to Sunda names, we must fetch all and filter client-side 
                // to enable searching by "Nasi Liwet" etc.
                const res = await fetch('https://dummyjson.com/recipes?limit=0');
                if (!res.ok) throw new Error('Gagal mengambil data resep');
                const data = await res.json();

                // Map to Sunda first
                const allSunda = getSundaRecipes(data.recipes);

                // Filter by query
                if (query) {
                    const filtered = allSunda.filter(recipe =>
                        recipe.name.toLowerCase().includes(query.toLowerCase())
                    );
                    setRecipes(filtered);
                } else {
                    setRecipes(allSunda);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchRecipes();
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <Layout title="Cari Resep - Dapur Sunda">
            {/* CSR Indicator */}
            <div className="fixed bottom-4 right-4 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg z-50">
                CSR (Client Side Rendering)
            </div>

            <div className="max-w-2xl mx-auto mb-10">
                <h1 className="text-3xl font-bold text-center mb-6 text-secondary">Cari Resep Favoritmu</h1>
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari 'Nasi Liwet', 'Karedok'..."
                        className="w-full px-5 py-3 pl-12 rounded-full border border-gray-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm text-lg" // id: input-search
                    />
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute left-4 top-3.5" />
                </div>
            </div>

            {loading && (
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-500 text-lg">Sedang memuat resep...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8" role="alert">
                    <p className="font-bold">Terjadi Kesalahan</p>
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && recipes.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    <p>Tidak ada resep yang ditemukan untuk kata kunci "{query}".</p>
                </div>
            )}

            {!loading && !error && recipes.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            )}
        </Layout>
    );
}
