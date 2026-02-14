import Layout from '../../components/Layout';
import RecipeCard from '../../components/RecipeCard';
import { getSundaRecipes } from '../../utils/sundaMapping';

export default function Recipes({ recipes }) {
    return (
        <Layout title="Daftar Resep - Dapur Sunda">
            {/* SSR Indicator */}
            <div className="fixed bottom-4 right-4 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg z-50">
                SSR (Server Side Rendering)
            </div>

            <h1 className="text-3xl font-bold text-center mb-10 text-secondary">
                Koleksi Resep Masakan Sunda
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </Layout>
    );
}

// Server Side Rendering
export async function getServerSideProps() {
    // Fetch real data from API on every request
    const res = await fetch('https://dummyjson.com/recipes?limit=0');
    const data = await res.json();

    // Map/Filter to Sundanese recipes
    const recipes = getSundaRecipes(data.recipes);

    return {
        props: {
            recipes,
        },
    };
}
