import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import SearchComic from '../components/Home/SearchComic'
import CardTerbaruComic from '../components/Home/CardTerbaruComic'
import CardTrendingComic from '../components/Home/CardTrendingComic'
import SEO from '../components/SEO'

const Home = () => {
  return (
    <>
      <SEO
        title="Kanata-Toon - Baca Komik Gratis Bahasa Indonesia Terbaru"
        description="Baca komik online gratis di Kanata-Toon. Koleksi lengkap komik terbaru, trending, dan populer dalam bahasa Indonesia. Update setiap hari!"
        keywords="komik indonesia, baca komik gratis, komik online, manga indonesia, manhwa indonesia"
        url="https://comic.antidonasi.web.id/"
      />
      <div className="relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-[#0a0a0a] dark:via-[#121212] dark:to-[#1a1a1a] min-h-screen text-gray-900 dark:text-gray-100 transition-colors">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section with Search */}
        <div className="pt-8 pb-4">
          <SearchComic />
        </div>

        {/* Terbaru Section */}
        <div className="pb-6">
          <CardTerbaruComic />
        </div>

        {/* Trending Section */}
        <div className="pb-6">
          <CardTrendingComic />
        </div>

        {/* Quick Links Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Jelajahi Lebih Banyak
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Temukan koleksi komik lengkap di pustaka kami
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              to="/pustaka"
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 max-w-md">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FontAwesomeIcon icon={faBookOpen} className="text-3xl text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent text-center">
                    Pustaka Komik
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-6 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors text-center">
                    Jelajahi koleksi lengkap pustaka komik dengan ribuan judul
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-white transition-colors">
                    <span className="text-sm font-semibold mr-2">Lihat Semua</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className="h-1 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-300 dark:border-gray-700 pt-8">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  KanataToon - Platform baca komik online terbaik
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
                  &copy; 2024 KanataToon. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
    </>
  )
}

export default Home