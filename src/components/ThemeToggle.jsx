import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
        >
            <div className="relative w-6 h-6">
                {/* Sun Icon */}
                <FontAwesomeIcon
                    icon={faSun}
                    className={`absolute inset-0 transition-all duration-300 ${
                        theme === 'light'
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 rotate-90 scale-0'
                    }`}
                />
                {/* Moon Icon */}
                <FontAwesomeIcon
                    icon={faMoon}
                    className={`absolute inset-0 transition-all duration-300 ${
                        theme === 'dark'
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 -rotate-90 scale-0'
                    }`}
                />
            </div>
        </button>
    )
}

export default ThemeToggle
