import React from 'react'
import CardTerbaruComic from '../components/Home/CardTerbaruComic'
import SEO from '../components/SEO'

const TerbaruPage = () => {
    return (
        <>
            <SEO
                title="Komik Terbaru"
                description="Daftar komik terbaru yang baru saja update. Baca komik online gratis dengan update terbaru setiap hari di Kanata-Toon."
                keywords="komik terbaru, komik baru, update komik, komik hari ini"
                url="https://comic.antidonasi.web.id/terbaru"
            />
            <div className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-[#0a0a0a] dark:via-[#121212] dark:to-[#1a1a1a] min-h-screen text-gray-900 dark:text-gray-100 transition-colors">
            {/* Background decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 pt-8">
                <CardTerbaruComic />
            </div>
        </div>
        </>
    )
}

export default TerbaruPage
