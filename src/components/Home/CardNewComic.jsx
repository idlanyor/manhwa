import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SkeletonLoader from '../SkeletonLoader'

const CardNewComic = ({ currentPage, setCurrentPage }) => {
    const [comics, setComics] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [hasNextPage, setHasNextPage] = useState(true)

    const navigate = useNavigate()

    const fetchComics = async () => {
        setLoading(true);
        setError(null);
        window.scrollTo(0, 0); 
        
        try {
            let pagesToFetch = [];
            const pagesPerLoad = 2; // Muat 3 API sekaligus

            if (currentPage === 1) {
                pagesToFetch.push(1);
            } else {
                const startPage = ((currentPage - 2) * pagesPerLoad) + 2;
                for (let i = 0; i < pagesPerLoad; i++) {
                    pagesToFetch.push(startPage + i);
                }
            }
            const fetchPromises = pagesToFetch.map(page =>
                axios.get(`https://www.sankavollerei.com/comic/pustaka/${page}`)
            );

            const responses = await Promise.all(fetchPromises);

            let allRawComics = [];
            let anyPageHasData = false;

            for (const response of responses) {
                const rawComics = response.data.results || [];
                if (rawComics.length > 0) {
                    anyPageHasData = true;
                    allRawComics.push(...rawComics);
                }
            }
            
            setHasNextPage(anyPageHasData);

            const filteredComics = allRawComics.filter(item => 
                !item.title.toLowerCase().includes('apk') && 
                (item.latestChapter && !item.latestChapter.title.toLowerCase().includes('download'))
            );

            const processedComics = filteredComics.map(comic => {
                const slug = comic.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')  
                    .replace(/^-+|-+$/g, '');  
                const chapterNumber = comic.latestChapter?.title.split(' ').pop() || 'N/A';
                return {
                    title: comic.title,
                    image: comic.thumbnail,
                    chapter: chapterNumber, 
                    source: comic.type || 'N/A',
                    popularity: comic.genre || 'N/A',
                    processedLink: comic.detailUrl.replace('/detail-komik/', ''),
                    slug: slug
                }
            })

            setComics(processedComics);

        } catch (err) {
            if (err.response && err.response.status === 404) {
                setHasNextPage(false);
                if (currentPage > 1) setComics([]); 
            } else {
                setError(err)
                console.error("Error fetching pustaka comics:", err)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchComics()
    }, [currentPage])

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    }
    
    const handlePrevPage = () => {
        setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
        if (currentPage > 1) {
            setHasNextPage(true); 
        }
    }

    const handleComicDetail = (comic) => {
        navigate(`/detail-comic/${comic.slug}`, { 
            state: { 
                comic: comic,
                processedLink: comic.processedLink 
            } 
        })
    }

    if (loading && currentPage === 1 && comics.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                            Pustaka Komik Terbaru
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
    if (!loading && !error && comics.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                            {currentPage === 1 ? "Pustaka Komik Terbaru" : `Pustaka Komik (Halaman ${currentPage})`}
                        </h2>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-gray-300 dark:from-gray-700 to-transparent"></div>
                </div>

                <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
                    <svg className="w-24 h-24 text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-center text-gray-600 dark:text-gray-400 text-lg mb-8">
                        Tidak ada komik lagi yang ditemukan.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1 || loading}
                            className="group relative px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-indigo-600 disabled:hover:to-purple-600 shadow-lg hover:shadow-indigo-500/50 flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Sebelumnya
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={true}
                            className="px-8 py-3 bg-gray-700 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center gap-2"
                        >
                            Berikutnya
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                        {currentPage === 1 ? "Pustaka Komik Terbaru" : `Pustaka Komik (Halaman ${currentPage})`}
                    </h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 dark:from-gray-700 to-transparent"></div>
                {currentPage > 1 && (
                    <span className="text-gray-600 dark:text-gray-400 text-sm bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-full">
                        Halaman {currentPage}
                    </span>
                )}
            </div>

            {loading ? (
                <div className="flex justify-center items-center min-h-[600px]">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-indigo-500"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                    {comics.map((comic, index) => (
                        <div
                            key={`${comic.slug}-${index}`}
                            className="group relative bg-white/80 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="relative aspect-[2/3] overflow-hidden">
                                <img
                                    src={comic.image}
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
                                <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                                    Ch. {comic.chapter}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-gray-300">{comic.source}</span>
                                        <span className="text-yellow-400 flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                            </svg>
                                            {comic.popularity}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="font-bold text-sm md:text-base line-clamp-2 mb-3 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors min-h-[2.5rem]">
                                    {comic.title}
                                </h3>
                                <button
                                    onClick={() => handleComicDetail(comic)}
                                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2"
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
            )}

            <div className="flex flex-wrap justify-center gap-4 mt-12">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1 || loading}
                    className="group relative px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-indigo-600 disabled:hover:to-purple-600 shadow-lg hover:shadow-indigo-500/50 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {loading ? 'Memuat...' : 'Sebelumnya'}
                </button>

                <div className="flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-800 rounded-xl">
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">Halaman {currentPage}</span>
                </div>

                <button
                    onClick={handleNextPage}
                    disabled={!hasNextPage || loading}
                    className="group relative px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-indigo-600 disabled:hover:to-purple-600 shadow-lg hover:shadow-indigo-500/50 flex items-center gap-2"
                >
                    {loading ? 'Memuat...' : 'Berikutnya'}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default CardNewComic