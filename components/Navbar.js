import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { Bars3Icon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

export default function Navbar() {
    const router = useRouter();
    const { favorites } = useFavorites();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Resep', href: '/resep' },
        { name: 'Cari', href: '/cari' },
        { name: 'Favorit', href: '/favorit' },
    ];

    return (
        <nav className="fixed top-0 w-full bg-white shadow-md z-50">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                        <span>Dapur Sunda</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={clsx(
                                    "text-lg font-medium transition-colors duration-200 relative",
                                    router.pathname === link.href ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-primary"
                                )}
                            >
                                {link.name}
                                {link.name === 'Favorit' && favorites.length > 0 && (
                                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                        {favorites.length}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-primary focus:outline-none"
                        >
                            {isOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
                    <div className="px-6 pt-2 pb-4 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={clsx(
                                    "block py-2 text-lg font-medium border-l-4 pl-3",
                                    router.pathname === link.href
                                        ? "text-primary border-primary bg-blue-50"
                                        : "text-gray-600 border-transparent hover:bg-gray-50 hover:text-primary"
                                )}
                            >
                                <div className="flex items-center justify-between">
                                    {link.name}
                                    {link.name === 'Favorit' && favorites.length > 0 && (
                                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                            {favorites.length}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
