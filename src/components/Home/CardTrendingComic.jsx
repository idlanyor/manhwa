import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SkeletonLoader from '../SkeletonLoader'

const CardTrendingComic = () => {
  const [comics, setComics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const fetchComics = async () => {
    try {
      const response = await axios.get('https://www.sankavollerei.com/comic/trending')

      const rawComics = response.data.trending || []

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
          : 'https://via.placeholder.com/300x450?text=Trending+Cover';
        
        return {
          ...comic,
          image: imageUrl,
          processedLink: link,
          slug: slug,
          source: comic.timeframe || '-',
          popularity: comic.trending_score || 0
        }
      })

      setComics(processedComics)
      setLoading(false)

    } catch (err) {
      setError(err)
      setLoading(false)
      console.error("Error fetching trending comics:", err)
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
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Trending Hari Ini
            </h2>
          </div>
          <svg className="w-6 h-6 text-orange-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
          </svg>
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
          <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Trending Hari Ini
          </h2>
        </div>
        <svg className="w-6 h-6 text-orange-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
        </svg>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-300 dark:from-gray-700 to-transparent"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {comics.map((comic, index) => (
          <div
            key={comic.title}
            className="group relative bg-white/80 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Trending Badge */}
            {index < 3 && (
              <div className="absolute top-0 left-0 z-10">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-br-xl rounded-tl-xl text-xs font-bold shadow-lg flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  #{index + 1}
                </div>
              </div>
            )}

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
              <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
                </svg>
                {comic.popularity}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-gray-300 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {comic.source}
                </p>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-sm md:text-base line-clamp-2 mb-3 text-gray-900 dark:text-gray-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors min-h-[2.5rem]">
                {comic.title}
              </h3>
              <button
                onClick={() => handleComicDetail(comic)}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 rounded-lg hover:from-orange-500 hover:to-red-500 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-orange-500/50 flex items-center justify-center gap-2"
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

export default CardTrendingComic