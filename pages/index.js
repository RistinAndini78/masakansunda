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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 opacity-50 rounded-3xl -z-10"></div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-secondary mb-4 tracking-tight">
          Jelajahi Cita Rasa <br />
          <span className="text-primary">Masakan Khas Sunda</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          Temukan kenikmatan kuliner tradisional Jawa Barat yang kaya akan bumbu rempah dan kesegaran alami. Resep otentik untuk keluarga Anda.
        </p>
        <Link
          href="/resep"
          className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all hover:-translate-y-1"
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
          <Link href="/resep" className="text-primary hover:text-blue-700 font-semibold hidden md:block">
            Lihat Lainnya &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/resep" className="text-primary hover:text-blue-700 font-semibold">
            Lihat Lainnya &rarr;
          </Link>
        </div>

        <div className="mt-16 text-center border-t border-gray-200 pt-8">
          <p className="text-gray-600 mb-4 font-medium">Tertarik dengan kode sumber proyek ini?</p>
          <a
            href="https://github.com/RistinAndini78/masakansunda.git"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-gray-800 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-700 hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            Repository GitHub
          </a>
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
