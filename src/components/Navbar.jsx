import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faNewspaper, faFire, faBookOpen, faChartLine } from '@fortawesome/free-solid-svg-icons'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
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
        <>
        {/* Desktop Navbar - Hidden on Mobile */}
        <nav className="hidden md:block sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-lg transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
                            <div className="relative bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] p-2 rounded-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FCAF45] bg-clip-text text-transparent">
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
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] rounded-lg"></div>
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
                    </div>
                </div>
            </div>
        </nav>

        {/* Mobile Logo Bar - Only visible on mobile */}
        <div className="md:hidden sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-lg transition-colors">
            <div className="flex items-center justify-between h-16 px-4">
                <Link to="/" className="flex items-center gap-3">
                    <div className="relative">
                        <div className="relative bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] p-2 rounded-lg">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-lg font-bold bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#FCAF45] bg-clip-text text-transparent">
                        KanataToon
                    </h1>
                </Link>
                <ThemeToggle />
            </div>
        </div>

        {/* Mobile Bottom App Bar */}
        <div className="md:hidden fixed z-50 w-[calc(100%-2rem)] max-w-lg h-16 -translate-x-1/2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-full bottom-4 left-1/2 shadow-2xl" style={{
            boxShadow: '0 10px 40px rgba(131, 58, 180, 0.3), 0 0 0 1px rgba(131, 58, 180, 0.1)'
        }}>
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                {navLinks.map((link, index) => {
                    const isFirst = index === 0
                    const isLast = index === navLinks.length - 1
                    const roundedClass = isFirst ? 'rounded-s-full' : isLast ? 'rounded-e-full' : ''
                    
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`relative inline-flex flex-col items-center justify-center ${roundedClass} transition-all duration-300 group`}
                        >
                            {isActive(link.path) && (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] opacity-10 rounded-full"></div>
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] rounded-full"></div>
                                </>
                            )}
                            <FontAwesomeIcon 
                                icon={link.icon} 
                                className={`w-5 h-5 mb-1 transition-all duration-300 relative z-10 ${
                                    isActive(link.path) 
                                        ? 'text-[#E1306C] scale-110' 
                                        : 'text-gray-600 dark:text-gray-400 group-hover:text-[#E1306C] group-hover:scale-110'
                                }`}
                            />
                            <span className={`text-xs font-medium transition-all duration-300 relative z-10 ${
                                isActive(link.path) 
                                    ? 'text-[#E1306C] font-bold' 
                                    : 'text-gray-600 dark:text-gray-400 group-hover:text-[#E1306C]'
                            }`}>
                                {link.name}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </div>
        </>
    )
}

export default Navbar
