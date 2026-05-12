import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import DropDownSelect from '../components/DropDownSelect'
import { getShows } from '../services/ShowService'
import Loading from '../components/Loading'
import TiltedPoster from '../components/TiltedPoster'
import { Link } from 'react-router-dom'
import Paginator from '../components/Paginator'
import NoResults from '../components/NoResults'
import { MdOutlineLiveTv } from 'react-icons/md'
import { BiCameraMovie } from 'react-icons/bi'
import { PiFloppyDisk } from 'react-icons/pi'
import { CiCircleCheck } from "react-icons/ci";
import { CiCircleRemove } from "react-icons/ci";
import { CiCircleMore } from "react-icons/ci";
import { CiCircleQuestion } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { CiClock1 } from "react-icons/ci";
import SeachInput from '../components/SeachInput'

function Library() {
    const [searchParams, setSearchParams] = useSearchParams()
    const statuses = [null, "To Watch", "Watching", "Completed", "Waiting", "Dropped"]
    const statusesEnum = [null, "TO_WATCH", "WATCHING", "COMPLETED", "WAITING", "DROPPED"]
    const types = [null, "Movie", "Tv"]
    const typesEnum = [null, "MOVIE", "TV_SERIE"]

    // All filter state derived from URL params
    const currentPage = parseInt(searchParams.get('page') || '1')
    const statusEnum = searchParams.get('status') || null
    const typeEnum = searchParams.get('type') || null
    const title = searchParams.get('title') || ''

    // Convert enums back to display values for dropdowns
    const statusIdx = statusesEnum.indexOf(statusEnum)
    const status = statuses[statusIdx >= 0 ? statusIdx : 0]
    const typeIdx = typesEnum.indexOf(typeEnum)
    const type = types[typeIdx >= 0 ? typeIdx : 0]

    const [shows, setShows] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(null)
    const controllerRef = useRef()

    useEffect(() => {
        document.title = 'My Library | TV Library'
    }, [])

    const fetchData = async (tEnum, page, sEnum, q) => {
        if (controllerRef.current) controllerRef.current.abort()
        controllerRef.current = new AbortController()
        const signal = controllerRef.current.signal
        const user = localStorage.getItem('user')
        setLoading(true)
        await getShows(tEnum, page, sEnum, q, signal, user)
            .then(response => {
                setShows(response.data.shows)
                setTotalPages(response.data.total_pages)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                if (error.code !== "ERR_CANCELED")
                    setLoading(false)
            })
    }

    // Re-fetch whenever URL params change (handles back/forward navigation)
    useEffect(() => {
        fetchData(typeEnum, currentPage, statusEnum, title)
    }, [searchParams])

    const updateParams = (updates) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev)
            Object.entries(updates).forEach(([key, value]) => {
                if (value == null || value === '') next.delete(key)
                else next.set(key, String(value))
            })
            return next
        })
    }

    const handleSetType = (newType) => {
        updateParams({ type: typesEnum[types.indexOf(newType)], page: '1' })
    }

    const handleSetStatus = (newStatus) => {
        updateParams({ status: statusesEnum[statuses.indexOf(newStatus)], page: '1' })
    }

    const handleSetTitle = (newTitle) => {
        updateParams({ title: newTitle || null, page: '1' })
    }

    const handleSetCurrentPage = (newPage) => {
        updateParams({ page: newPage })
    }

    return (
        <div className='min-h-screen pb-20'>
            {/* Hero Section */}
            <div className="w-full bg-slate-50 border-b border-slate-200 pt-8 pb-6 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Collection</h1>
                        <p className="text-slate-500 mt-1">Manage and track your customized library</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="w-full sm:w-auto flex justify-center">
                            <SeachInput key={title} value={title} setValue={handleSetTitle} />
                        </div>
                        <div className="flex w-full sm:w-auto items-center justify-center gap-2">
                            <div className="flex-1 sm:flex-none">
                                <DropDownSelect
                                    options={types}
                                    icons={[PiFloppyDisk, BiCameraMovie, MdOutlineLiveTv]}
                                    selected={type} setSelected={handleSetType}
                                />
                            </div>
                            <div className="flex-1 sm:flex-none">
                                <DropDownSelect
                                    options={statuses}
                                    icons={[CiCircleMore, CiClock1, CiCircleMinus, CiCircleCheck, CiCircleQuestion, CiCircleRemove]}
                                    selected={status} setSelected={handleSetStatus}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Section */}
            <div className="max-w-7xl mx-auto mt-8 px-4">
                {loading
                    ? <Loading min_h={"60"} />
                    : shows.length !== 0
                        ? <>
                            <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6'>
                                {shows?.map(show => (
                                    <div className="w-full relative" key={show._id}>
                                        <Link to={`/${show.type}/${show.tmdbId}`} className="block block w-full shadow-md rounded-lg overflow-hidden border border-slate-200">
                                            <TiltedPoster src={"https://image.tmdb.org/t/p/w500" + show.poster} title={show.title} />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-center pt-14 pb-8'>
                                <Paginator totalPages={totalPages} currentPage={currentPage} fetchData={handleSetCurrentPage} />
                            </div>
                        </>
                        : <NoResults />
                }
            </div>
        </div>
    )
}

export default Library
