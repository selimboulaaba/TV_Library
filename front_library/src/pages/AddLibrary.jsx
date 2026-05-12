import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getSearch } from '../services/TMDB'
import Paginator from '../components/Paginator'
import Loading from '../components/Loading'
import TiltedPoster from '../components/TiltedPoster'
import NoResults from '../components/NoResults'
import { Link } from 'react-router-dom'

function AddLibrary() {
    const [searchParams, setSearchParams] = useSearchParams()

    // URL-derived state
    const currentQuery = searchParams.get('q') || ''
    const currentPage = parseInt(searchParams.get('page') || '1')
    const isMovie = searchParams.get('mediaType') !== 'tv'

    // Local input state (tracks what user is typing before submitting)
    const [localSearch, setLocalSearch] = useState(currentQuery)
    const [list, setList] = useState(null)
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(null)

    useEffect(() => {
        document.title = 'Search Movies & Shows | TV Library'
    }, [])

    const fetchData = async (page, query, movieMode) => {
        setLoading(true)
        await getSearch(query, page, movieMode ? "movie" : "tv")
            .then(response => {
                setList(response.data.results)
                setTotalPages(response.data.total_pages)
            })
            .catch(error => {
                console.log(error.response?.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    // Fetch whenever URL params change (handles back/forward navigation)
    useEffect(() => {
        if (currentQuery) {
            fetchData(currentPage, currentQuery, isMovie)
        }
    }, [searchParams])

    // Sync local input when URL query changes (e.g. navigating back)
    useEffect(() => {
        setLocalSearch(currentQuery)
    }, [currentQuery])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearchParams(prev => {
            const next = new URLSearchParams(prev)
            if (localSearch) next.set('q', localSearch); else next.delete('q')
            next.set('page', '1')
            return next
        })
    }

    const handlePageChange = (page) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev)
            next.set('page', String(page))
            return next
        })
    }

    const handleTypeToggle = () => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev)
            if (isMovie) next.set('mediaType', 'tv')
            else next.delete('mediaType')
            next.set('page', '1')
            return next
        })
    }

    return (
        <div className='min-h-screen pb-20 bg-slate-50'>
            {/* Header Section */}
            <div className="w-full bg-slate-50 border-b border-slate-200 pt-8 pb-6 px-4">
                <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-6">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight text-center">
                        Find <span className="text-indigo-600">{isMovie ? 'Movies' : 'TV Series'}</span>
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className='w-full glass-panel p-3 sm:p-4 rounded-2xl flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-between'
                    >
                        {/* Toggle switch */}
                        <label className="relative inline-flex items-center cursor-pointer shrink-0 w-full sm:w-auto justify-center sm:justify-start">
                            <input className="sr-only peer" checked={!isMovie} type="checkbox" onChange={handleTypeToggle} />
                            <div className="w-24 h-12 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-12 after:content-[''] after:absolute after:top-1 after:left-[calc(50%-2.75rem)] sm:after:left-1 after:bg-indigo-600 after:rounded-full after:h-10 after:w-10 after:transition-all peer-checked:bg-slate-200 shadow-inner flex items-center justify-between px-3 relative">
                                <span className={`text-xs font-bold z-10 transition-colors ${isMovie ? 'text-white' : 'text-slate-500'}`}>MV</span>
                                <span className={`text-xs font-bold z-10 transition-colors ${!isMovie ? 'text-white' : 'text-slate-500'}`}>TV</span>
                            </div>
                        </label>

                        <div className="flex w-full gap-2">
                            {/* Search Input */}
                            <div className="w-full relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <input
                                    placeholder={`Search for ${isMovie ? 'Movies' : 'TV Shows'}...`}
                                    className="w-full bg-white border border-slate-300 text-slate-900 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm placeholder-slate-400"
                                    name="search"
                                    type="search"
                                    value={localSearch}
                                    onChange={(event) => setLocalSearch(event.target.value)}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors shadow-md shadow-indigo-500/20 shrink-0 disabled:opacity-50"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Results Grid */}
            <div className="max-w-7xl mx-auto mt-8 px-4">
                {loading
                    ? <Loading min_h={"60"} />
                    : <>
                        <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 pt-5'>
                            {list?.length !== 0 && list?.map(object => (
                                <div className="w-full relative" key={object.id}>
                                    <Link to={`/${isMovie ? "MOVIE" : "TV_SERIE"}/${object.id}`} className="block w-full shadow-md rounded-lg overflow-hidden border border-slate-200">
                                        <TiltedPoster src={"https://image.tmdb.org/t/p/w500" + object.poster_path} title={object.title ? object.title : object.name} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-10">
                            {list != null && list.length !== 0 && <Paginator totalPages={totalPages} currentPage={currentPage} fetchData={handlePageChange} />}
                        </div>
                        {list != null && list.length === 0 && currentQuery !== "" && <NoResults />}
                    </>
                }
            </div>
        </div>
    )
}

export default AddLibrary
