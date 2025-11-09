import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchComic = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    // Live search dengan debouncing
    useEffect(() => {
        // Bersihkan hasil jika query kosong
        if (!searchQuery.trim()) {
            setSearchResults([])
            setError(null)
            return
        }

        // Set loading state
        setLoading(true)
        setError(null)

        // Debounce: tunggu 500ms setelah user berhenti mengetik
        const debounceTimer = setTimeout(async () => {
            try {
                const response = await axios.get(`https://www.sankavollerei.com/comic/search?q=${encodeURIComponent(searchQuery)}`)

                // Process the search results similar to CardNewComic
                const processedResults = response.data.data.map(comic => {
                    const slug = comic.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-+|-+$/g, '')

                    return {
                        ...comic,
                        processedLink: comic.href,
                        slug: slug
                    }
                })

                setSearchResults(processedResults)
            } catch (err) {
                setError('Terjadi kesalahan saat mencari komik')
            } finally {
                setLoading(false)
            }
        }, 500) // 500ms delay

        // Cleanup function untuk cancel request sebelumnya
        return () => {
            clearTimeout(debounceTimer)
            setLoading(false)
        }
    }, [searchQuery]) // Trigger setiap searchQuery berubah

    const handleComicDetail = (comic) => {
        // Format processedLink dengan benar
        const processedLink = comic.href.replace('/detail-komik/', '')
        
        navigate(`/detail-comic/${comic.slug}`, {
            state: {
                comic: {
                    title: comic.title,
                    image: comic.thumbnail,
                    chapter: comic.description || 'Chapter Terbaru',
                    source: comic.type,
                    link: comic.href, // Tambahkan link original
                    popularity: comic.genre || '-' // Gunakan genre sebagai popularity jika ada
                },
                processedLink: processedLink
            }
        })
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            {/* Hero Search Section */}
            <div className="relative mb-10">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 blur-3xl -z-10"></div>

                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                        KanataToon
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">Temukan dan baca ribuan komik favorit Anda</p>
                </div>

                {/* Modern Search Box */}
                <div className="relative max-w-3xl mx-auto">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                        <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700 overflow-hidden">
                            <svg className="w-6 h-6 text-gray-400 dark:text-gray-400 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari komik berdasarkan judul..."
                                className="flex-1 px-4 py-4 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-lg"
                            />
                            {loading && (
                                <div className="px-6">
                                    <svg className="animate-spin h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            )}
                            {searchQuery && !loading && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="px-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    title="Clear search"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="max-w-3xl mx-auto mb-6">
                    <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400 text-center backdrop-blur-sm">
                        <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </div>
                </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && (
                <div className="mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            Hasil Pencarian ({searchResults.length})
                        </h2>
                        <button
                            onClick={() => {
                                setSearchResults([])
                                setSearchQuery('')
                            }}
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                        {searchResults.map((comic, index) => (
                            <div
                                key={comic.title}
                                className="group relative bg-white/80 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="relative aspect-[2/3] overflow-hidden">
                                    <img
                                        src={comic.thumbnail}
                                        alt={comic.title}
                                        width="300"
                                        height="450"
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300x450?text=Comic+Cover'
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute top-2 right-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                        {comic.type}
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="font-bold text-sm md:text-base line-clamp-2 mb-2 text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {comic.title}
                                    </h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-1">{comic.genre}</p>
                                    <button
                                        onClick={() => handleComicDetail(comic)}
                                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-indigo-500/50"
                                    >
                                        Lihat Detail
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchComic