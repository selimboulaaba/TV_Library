import React, { useEffect, useRef, useState } from 'react'
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
    const [type, setType] = useState(null)
    const [shows, setShows] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [status, setStatus] = useState(null)
    const statuses = [null, "To Watch", "Watching", "Completed", "Waiting", "Dropped"]
    const statusesEnum = [null, "TO_WATCH", "WATCHING", "COMPLETED", "WAITING", "DROPPED"]
    const types = [null, "Movie", "Tv"]
    const typesEnum = [null, "MOVIE", "TV_SERIE"]
    const [title, setTitle] = useState("")
    const controllerRef = useRef();

    const fetchData = async (type, currentPage, status, title) => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        controllerRef.current = new AbortController();
        const signal = controllerRef.current.signal;
        
        await getShows((typesEnum[types.indexOf(type)]), currentPage, (statusesEnum[statuses.indexOf(status)]), title, signal)
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
        fetchData(type, currentPage, status, title);
    }, [type, currentPage, status, title])

    return (
        <div className='mt-[50px]'>
            <div className='sm:flex items-center justify-center'>
                <div className="flex items-center justify-center">
                    <SeachInput value={title} setValue={setTitle} />
                </div>
                <div className="flex items-center justify-center">
                    <DropDownSelect
                        options={types}
                        icons={[PiFloppyDisk, BiCameraMovie, MdOutlineLiveTv]}
                        selected={type} setSelected={setType}
                    />
                    <DropDownSelect
                        options={statuses}
                        icons={[CiCircleMore, CiClock1, CiCircleMinus, CiCircleCheck, CiCircleQuestion, CiCircleRemove]}
                        selected={status} setSelected={setStatus}
                    />
                </div>
            </div>

            {loading
                ? <Loading />
                : shows.length !== 0
                    ? <>
                        <div className='grid grid-cols-12 gap-3 p-5'>
                            {shows?.map(show => (
                                <div className="col-span-6 md:col-span-3 lg:col-span-2 grid w-full place-content-center" key={show._id}>
                                    <Link to={`/${show.type}/${show.tmdbId}`}>
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