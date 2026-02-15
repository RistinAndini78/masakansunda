import Navbar from './Navbar';
import Head from 'next/head';

export default function Layout({ children, title = "Dapur Sunda - Masakan Khas" }) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Platform Resep Masakan Khas Sunda" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="min-h-screen bg-blue-50/30 flex flex-col">
                <Navbar />
                <main className="flex-grow pt-20 pb-10">
                    <div className="max-w-6xl mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
                <footer className="bg-secondary text-white py-6 text-center">
                    <p className="text-sm">© {new Date().getFullYear()} Dapur Sunda. Dibuat dengan Cinta untuk Tradisi.</p>
                </footer>
            </div>
        </>
    );
}
