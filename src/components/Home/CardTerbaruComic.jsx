import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SkeletonLoader from '../SkeletonLoader'

const CardTerbaruComic = () => {
    const [comics, setComics] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const fetchComics = async () => {
        try {
            const response = await axios.get('https://www.sankavollerei.com/comic/terbaru')
            const rawComics = response.data.comics || []
            const filteredComics = rawComics.filter(item => 
                !item.title.toLowerCase().includes('apk') && 
                !item.chapter.toLowerCase().includes('download')
            )
            
            const processedComics = filteredComics.map(comic => {
                const slug = comic.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, '');

                const link = comic.link.replace('/manga/', '/').replace('/plus/', '/');

                const imageUrl = comic.image && !comic.image.includes('lazy.jpg')
                    ? comic.image
                    : 'https://via.placeholder.com/300x450?text=Cover+Terbaru';
                
                return {
                    ...comic,
                    image: imageUrl,
                    processedLink: link,
                    slug: slug,
                    source: 'Terbaru', 
                    popularity: 'N/A'   
                }
            })

            setComics(processedComics)
            setLoading(false)

        } catch (err) {
            setError(err)
            setLoading(false)
            console.error("Error fetching terbaru comics:", err)
        }
    }

    useEffect(() => {
        fetchComics()
    }, [])

    const handleComicDetail = (comic) => {
        navigate(`/detail-comic/${comic.slug}`, { 
            state: { 
                comic: {
                    title: comic.title,
                    image: comic.image,
                    chapter: comic.chapter,
                    source: comic.source, 
                    popularity: comic.popularity
                },
                processedLink: comic.processedLink 
            } 
        })
    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                            Terbaru Hari Ini
                        </h2>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-gray-300 dark:from-gray-700 to-transparent"></div>
                </div>
                <SkeletonLoader count={12} type="card" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[400px] p-4">
                <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 text-center backdrop-blur-sm max-w-md">
                    <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-xl font-bold text-red-400 mb-2">Terjadi Kesalahan</h2>
                    <p className="text-red-300">{error.message}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                        Terbaru Hari Ini
                    </h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 dark:from-gray-700 to-transparent"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {comics.map((comic, index) => (
                    <div
                        key={comic.title}
                        className="group relative bg-white/80 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="relative aspect-[2/3] overflow-hidden">
                            <img
                                src={comic.image}
                                alt={comic.title}
                                width="300"
                                height="450"
                                loading={index < 6 ? "eager" : "lazy"}
                                decoding="async"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x450?text=Comic+Cover'
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute top-2 right-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                                </svg>
                                {comic.chapter}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-xs text-gray-300">{comic.source}</p>
                            </div>
                        </div>

                        <div className="p-4">
                            <h3 className="font-bold text-sm md:text-base line-clamp-2 mb-3 text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors min-h-[2.5rem]">
                                {comic.title}
                            </h3>
                            <button
                                onClick={() => handleComicDetail(comic)}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-indigo-500/50 flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Baca Komik
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CardTerbaruComic