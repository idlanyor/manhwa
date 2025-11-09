import React from 'react'
import CardTrendingComic from '../components/Home/CardTrendingComic'
import SEO from '../components/SEO'

const TrendingPage = () => {
    return (
        <>
            <SEO
                title="Komik Trending"
                description="Komik paling populer dan trending saat ini. Temukan komik favorit yang paling banyak dibaca di Kanata-Toon."
                keywords="komik trending, komik populer, komik hits, komik viral"
                url="https://comic.antidonasi.web.id/trending"
            />
            <div className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-[#0a0a0a] dark:via-[#121212] dark:to-[#1a1a1a] min-h-screen text-gray-900 dark:text-gray-100 transition-colors">
            {/* Background decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 pt-8">
                <CardTrendingComic />
            </div>
        </div>
        </>
    )
}

export default TrendingPage
