import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CardNewComic = () => {
    const [comics, setComics] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const fetchComics = async () => {
        try {
            // Endpoint
            const response = await axios.get('https://www.sankavollerei.com/comic/terbaru')

            // Proses link dan komik dengan menambahkan slug
            const processedComics = response.data.comics.slice(1).map(comic => {
                // Buat slug dari judul komik
                const slug = comic.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')  // Ganti karakter non-alfanumerik dengan strip
                    .replace(/^-+|-+$/g, '');  // Hapus strip di awal dan akhir

                return {
                    ...comic,
                    processedLink: comic.link.replace('/manga/', '/'),
                    slug: slug
                }
            })

            // Set komik
            setComics(processedComics)
            setLoading(false)

            // Log processed links dan slugs
            console.log("Processed Comics:", processedComics)
        } catch (err) {
            setError(err)
            setLoading(false)
            console.error("Error fetching comics:", err)
        }
    }

    useEffect(() => {
        fetchComics()
    }, [])

    const handleComicDetail = (comic) => {
        // Navigasi dengan membawa data komik dan slug
        navigate(`/detail-comic/${comic.slug}`, { 
            state: { 
                comic: comic,
                processedLink: comic.processedLink 
            } 
        })
    }

    const renderComicCard = (comic) => (
        <div
            key={comic.title}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
        >
            <div className="relative">
                <img
                    src={comic.image}
                    alt={comic.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x450?text=Comic+Cover'
                    }}
                />
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded">
                    {comic.chapter}
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg truncate mb-2">{comic.title}</h3>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{comic.source}</span>
                    <span className="text-sm text-gray-600">★ {comic.popularity}</span>
                </div>
                <button
                    onClick={() => handleComicDetail(comic)}
                    className="mt-2 block w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition text-center"
                >
                    Baca Komik
                </button>
            </div>
        </div>
    )

    // Komponen loading
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    // Komponen error
    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                <h2>Terjadi Kesalahan</h2>
                <p>{error.message}</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Komik Terbaru</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4 md:mx-16 gap-4">
                {comics.map(renderComicCard)}
            </div>
        </div>
    )
}

export default CardNewComic