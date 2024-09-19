import React, { useEffect, useState } from 'react'
import DropDownSelect from '../components/DropDownSelect'
import { getShows } from '../services/ShowService'
import Loading from '../components/Loading'
import TiltedPoster from '../components/TiltedPoster'
import { Link } from 'react-router-dom'
import Paginator from '../components/Paginator'
import NoResults from '../components/NoResults'

function Library() {
    const [type, setType] = useState('All')
    const [shows, setShows] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)

    const fetchData = async (filterType, page) => {
        await getShows(filterType, page)
            .then(response => {
                setShows(response.data.shows)
                setTotalPages(response.data.total_pages)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        setLoading(true)
        fetchData(type, currentPage);
    }, [type, currentPage])

    return (
        <div className='mt-[50px]'>
            <DropDownSelect type={type} setType={setType} />

            {loading
                ? <Loading />
                : shows.length !== 0
                    ? <>
                        <div className='grid grid-cols-12 gap-3 p-5'>
                            {shows?.map(show => (
                                <div className="col-span-6 md:col-span-3 lg:col-span-2 grid w-full place-content-center" key={show._id}>
                                    <Link to={`/${show.isMovie ? "movie" : "tv"}/${show.tmdbId}`}>
                                        <TiltedPoster src={"https://image.tmdb.org/t/p/w500" + show.poster} title={show.title} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className='grid gap-3 justify-items-center pb-10 mt-[70px]'>
                            <Paginator totalPages={totalPages} currentPage={currentPage} fetchData={setCurrentPage} />
                        </div>
                    </>
                    : <NoResults />
            }
        </div>
    )
}

export default Library