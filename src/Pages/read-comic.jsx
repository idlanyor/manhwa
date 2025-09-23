import React, { useState, useEffect } from 'react'

const ReadComic = () => {
    const [pages] = useState([
        'https://picsum.photos/800/1200?random=1',
        'https://picsum.photos/800/1200?random=2',
        'https://picsum.photos/800/1200?random=3',
        'https://picsum.photos/800/1200?random=4'
    ])
    const [scrollProgress, setScrollProgress] = useState(0)

    // Hitung scroll progress
    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.documentElement.scrollTop
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scrolled = (winScroll / height) * 100
            setScrollProgress(scrolled)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="bg-gray-100">
            {/* Header Fixed */}
            <div className="fixed top-0 left-0 right-0 bg-white shadow-md py-4 px-6 z-20 flex justify-between items-center">
                <button 
                    onClick={() => window.history.back()}
                    className="text-gray-600 hover:text-gray-900"
                >
                    ← Kembali
                </button>
                <h2 className="text-xl font-bold">Change Me - Chapter 207</h2>
                <div className="w-10"></div>
            </div>

            {/* Progress Bar */}
            <div 
                className="fixed top-16 left-0 right-0 h-1 bg-gray-200 z-20"
                style={{ zIndex: 30 }}
            >
                <div 
                    className="bg-blue-500 h-full" 
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Konten Komik */}
            <div className="container mx-auto px-4 pt-24 pb-10">
                {pages.map((page, index) => (
                    <img 
                        key={index} 
                        src={page} 
                        alt={`Halaman ${index + 1}`}
                        className="w-full object-contain"
                    />
                ))}
            </div>

            {/* Footer */}
            <div className="bg-white shadow-md py-2 px-6 text-center">
                <span className="text-sm text-gray-600">
                    Akhir Chapter
                </span>
            </div>
        </div>
    )
}

export default ReadComic