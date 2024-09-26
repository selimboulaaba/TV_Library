import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getSearch } from '../services/TMDB'
import Paginator from '../components/Paginator'
import Loading from '../components/Loading'
import TiltedPoster from '../components/TiltedPoster'
import NoResults from '../components/NoResults'
import { Link } from 'react-router-dom'

function AddLibrary() {

    const [search, setSearch] = useState("")
    const [list, setList] = useState(null)
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [isMovie, setIsMovie] = useState(true)

    const fetchData = async(page) => {
        setLoading(true)
        await getSearch(search, page, isMovie ? "movie" : "tv")
            .then(response => {
                setList(response.data.results)
                setTotalPages(response.data.total_pages)
                setCurrentPage(response.data.page)
            })
            .catch(error => {
                console.log(error.response.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className='grid gap-3 justify-items-center pb-10 mt-[70px]'>
            <form className='w-[90%] sm:w-[80%] md:w-[60%] grid grid-cols-12 gap-3'>
                <h1 className='col-span-7 text-center self-center text-xl sm:text-2xl'>Search for: <strong className='underline'>{isMovie ? 'Movies' : 'TV Series'}</strong></h1>
                <label className="col-start-9 col-span-3 relative inline-flex items-center cursor-pointer">
                    <input className="sr-only peer" value={isMovie} type="checkbox" onChange={() => setIsMovie(!isMovie)} />
                    <div className="group peer ring-2  bg-gradient-to-bl from-neutral-800 via-neutral-700 to-neutral-600  rounded-full outline-none duration-1000 after:duration-300 w-20 sm:w-24 h-8 sm:h-12  shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:[background:#0D2B39]   peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)]  after:outline-none after:h-6 after:w-6 sm:after:h-10 sm:after:w-10 after:top-1 after:left-1   peer-checked:after:translate-x-12 peer-hover:after:scale-125">
                    </div>
                </label>
                <div className="col-start-1 relative col-span-9">
                    <input
                        placeholder="Search..."
                        className="w-[90%] input shadow-lg focus:border-2 border-orange-700 px-5 py-3 rounded-xl transition-all focus:w-[100%] outline-none"
                        name="search"
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>
                <button onClick={(event) => { event.preventDefault(); fetchData(1) }} className="col-span-3 relative px-8 rounded-md bg-white isolation-auto z-10 hover:border-2 border-orange-700 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-orange-700 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center py-3 text-sm font-semibold text-blackborder shadow-lg gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    Fetch
                </button>
            </form>
            {loading
                ? <Loading />
                : <>
                    <div className='grid grid-cols-12 gap-3 p-5'>
                        {list?.length != 0 && list?.map(object => (
                            <div className="col-span-6 md:col-span-3 lg:col-span-2 grid w-full place-content-center" key={object.id}>
                                <Link to={`/${isMovie ? "MOVIE" : "TV_SERIE"}/${object.id}`}>
                                    <TiltedPoster src={"https://image.tmdb.org/t/p/w500" + object.poster_path} title={object.title ? object.title : object.name} />
                                </Link>
                            </div>
                        ))}
                    </div>
                    {list != null && list.length != 0 && <Paginator totalPages={totalPages} currentPage={currentPage} fetchData={fetchData} />}
                    {list != null && list.length === 0 && search != "" && <NoResults />}
                </>
            }
        </div>
    )
}

export default AddLibrary