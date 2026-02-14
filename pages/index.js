import Layout from '../components/Layout';
import RecipeCard from '../components/RecipeCard';
import { getSundaRecipes } from '../utils/sundaMapping';
import Link from 'next/link';

export default function Home({ featuredRecipes }) {
  return (
    <Layout title="Beranda - Dapur Sunda">
      {/* SSG Indicator */}
      <div className="fixed bottom-4 right-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg z-50">
        SSG (ISR: 60s)
      </div>

      {/* Hero Section */}
      <section className="text-center mb-16 py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-green-100 opacity-50 rounded-3xl -z-10"></div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-secondary mb-4 tracking-tight">
          Jelajahi Cita Rasa <br />
          <span className="text-primary">Masakan Khas Sunda</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          Temukan kenikmatan kuliner tradisional Jawa Barat yang kaya akan bumbu rempah dan kesegaran alami. Resep otentik untuk keluarga Anda.
        </p>
        <Link
          href="/resep"
          className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 hover:shadow-xl transition-all hover:-translate-y-1"
        >
          Lihat Semua Resep
        </Link>
      </section>

      {/* Featured Section */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-primary pl-4">
            Resep Pilihan
          </h2>
          <Link href="/resep" className="text-primary hover:text-green-700 font-semibold hidden md:block">
            Lihat Lainnya &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/resep" className="text-primary hover:text-green-700 font-semibold">
            Lihat Lainnya &rarr;
          </Link>
        </div>
      </section>
    </Layout>
  );
}

// SSG with ISR
export async function getStaticProps() {
  // Fetch real data from API
  const res = await fetch('https://dummyjson.com/recipes?limit=0');
  const data = await res.json();

  // Map/Filter to Sundanese recipes
  const allSunda = getSundaRecipes(data.recipes);

  // Take top 6 for featured
  const featuredRecipes = allSunda.slice(0, 6);

  return {
    props: {
      featuredRecipes,
    },
    revalidate: 60, // ISR: Re-generate every 60 seconds
  };
}
