import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faNewspaper, faFire, faBookOpen, faChartLine } from '@fortawesome/free-solid-svg-icons'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    const navLinks = [
        { name: 'Home', path: '/', icon: faHome },
        { name: 'Terbaru', path: '/terbaru', icon: faNewspaper },
        { name: 'Trending', path: '/trending', icon: faFire },
        { name: 'Pustaka', path: '/pustaka', icon: faBookOpen },
        { name: 'Statistics', path: '/statistics', icon: faChartLine },
    ]

    const isActive = (path) => {
        return location.pathname === path
    }

    return (
        <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-lg transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                            <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                KanataToon
                            </h1>
                        </div>
                    </Link>

                    {/* Desktop Navigation & Theme Toggle */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`
                                        relative px-4 py-2 rounded-lg font-medium transition-all duration-300
                                        ${isActive(link.path)
                                            ? 'text-white'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                        }
                                    `}
                                >
                                    {isActive(link.path) && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg"></div>
                                    )}
                                    <span className="relative flex items-center gap-2">
                                        <FontAwesomeIcon icon={link.icon} />
                                        {link.name}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Mobile menu button */}
                        <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
                    <div className="px-4 py-3 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`
                                    block px-4 py-3 rounded-lg font-medium transition-all duration-300
                                    ${isActive(link.path)
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }
                                `}
                            >
                                <span className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={link.icon} className="text-lg" />
                                    {link.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
