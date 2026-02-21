import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getById, getTrailerById } from '../services/TMDB';
import Poster from '../components/Poster';
import Loading from '../components/Loading'
import '../assets/css/addButton.css'
import { addToLibrary, getShow, removeFromLibrary, updatePausedAt, updateStatus } from '../services/ShowService';
import { Bounce, toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import DropDownSelect from '../components/DropDownSelect';
import { CiCircleCheck, CiCircleMinus, CiCircleQuestion, CiCircleRemove, CiClock1 } from 'react-icons/ci';

function Show() {
    const { id, type } = useParams();
    const [show, setShow] = useState({})
    const [trailer, setTrailer] = useState({ key: null })
    const [loading, setLoading] = useState(true)
    const [showMore, setShowMore] = useState(false)
    const [loadingOwned, setLoadingOwned] = useState(false)

    const [owned, setOwned] = useState(null)
    const [pausedAt, setPausedAt] = useState('')
    const [loadingPausedAt, setLoadingPausedAt] = useState(false)
    const [status, setStatus] = useState(null)
    const statuses = ["To Watch", "Watching", "Completed", "Waiting", "Dropped"]
    const statusesEnum = ["TO_WATCH", "WATCHING", "COMPLETED", "WAITING", "DROPPED"]

    const fetchData = async () => {
        await getById(id, type)
            .then(response => {
                setShow(response.data)
            })
            .catch(() => {
            })
        await getShow(id, type)
            .then(response => {
                setOwned(response.data._id)
                setPausedAt(response.data.pauseAt)
                setStatus(statuses[statusesEnum.indexOf(response.data.status)])
            })
        await getTrailerById(id, type)
            .then(response => {
                const newTrailer = response.data.results.filter(trailer =>
                    (trailer.name === "Official Trailer") ||
                    (trailer.name !== "Official Trailer" && trailer.name.includes("Official Trailer")) ||
                    (trailer.name !== "Official Trailer" && !trailer.name.includes("Official Trailer") && trailer.name.includes("Trailer"))
                )[0];
                setTrailer(newTrailer)
            })
            .catch(() => {
            })
            .finally(setLoading(false))
    }

    useEffect(() => {
        if (id && type) {
            fetchData()
        }
    }, [])

    const toggleShowMore = () => {
        setShowMore(!showMore)
    }

    const add = async () => {
            setLoadingOwned(true)
            const payload = {};
            const user = localStorage.getItem('user')

            payload.title = show.title ? show.title : show.name
            payload.description = show.overview
            payload.poster = show.poster_path
            payload.date = (type === 'MOVIE') ? show.release_date : show.first_air_date
            payload.type = type
            payload.genre = show.genres.map(genre => genre.name)
            payload.tmdbId = show.id
            payload.userId = user

            
            await addToLibrary(payload)
                .then(response => {
                    if (!response.data.success) {
                        toast.warn(response.data.message, {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Bounce,
                        });
                    } else {
                        setStatus(statuses[statusesEnum.indexOf(response.data.show.status)])
                        setOwned(response.data.show._id)
                        toast.success('Added to WatchList!', {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Bounce,
                        });
                    }
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setLoadingOwned(false)
                })
    }

    const remove = async () => {
            setLoadingOwned(true)
            await removeFromLibrary(owned)
                .then(response => {
                    if (!response.data.success) {
                        toast.warn(response.data.message, {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Bounce,
                        });
                    } else {
                        setOwned(null)
                        toast.success('Removed from WatchList!', {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Bounce,
                        });
                    }
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setLoadingOwned(false)
                })
    }

    const handlePausedAt = async () => {
        setLoadingPausedAt(true)
        await updatePausedAt(owned, pausedAt)
            .then(response => {
                if (!response.data.success) {
                    toast.warn(response.data.message, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                } else {
                    toast.success('Updated!', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                }
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoadingPausedAt(false)
            })
    }

    const handleStatus = async (newStatus) => {
        setStatus(newStatus)
        await updateStatus(owned, statusesEnum[statuses.indexOf(newStatus)])
            .then(response => {
                if (!response.data.success) {
                    toast.warn(response.data.message, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                } else {
                    toast.success('Updated!', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });
                }
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
            })
    }

    return (
        <div className='min-h-screen pb-20 bg-slate-50'>
            {loading ? (
                <div className="pt-20"><Loading min_h={"80"} /></div>
            ) : (
                <>
                    {/* Cinematic Backdrop Header */}
                    <div className="relative w-full h-[40vh] min-h-[300px] md:h-[55vh]">
                        <div 
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{ 
                                backgroundImage: `url('https://image.tmdb.org/t/p/original${show.backdrop_path || show.poster_path}')`,
                            }}
                        ></div>
                        {/* Gradient overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/70 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/80 via-slate-50/30 to-transparent"></div>
                    </div>

                    {/* Main Content Area — overlaps backdrop */}
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28 md:-mt-40 relative z-10'>
                        {/* Two-column row: poster left, content right */}
                        <div className='flex flex-col md:flex-row gap-6 md:gap-8 items-start'>

                            {/* ── LEFT COLUMN: Poster ── */}
                            <div className='shrink-0 self-center md:self-start w-36 sm:w-44 md:w-52 lg:w-64'>
                                <div className="shadow-2xl rounded-xl overflow-hidden">
                                    <Poster src={show.poster_path} trailer={trailer?.key} />
                                </div>
                            </div>

                            {/* ── RIGHT COLUMN: All info ── */}
                            <div className='flex-1 min-w-0 pt-2 md:pt-10 relative z-20'>

                                {/* Title */}
                                <h1 className='font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight'>
                                    {show.title || show.name}
                                </h1>

                                {/* Year + Genres */}
                                <div className="flex flex-wrap items-center gap-2 mt-3 text-sm font-medium">
                                    <span className="px-3 py-1 bg-slate-200 rounded-full border border-slate-300 text-slate-700">
                                        {(type === 'MOVIE') ? show.release_date?.substring(0,4) : show.first_air_date?.substring(0,4)}
                                    </span>
                                    {show.genres?.map(g => (
                                        <span key={g.id} className="px-3 py-1 bg-indigo-50 rounded-full border border-indigo-200 text-indigo-600">
                                            {g.name}
                                        </span>
                                    ))}
                                </div>

                                {/* ── ACTION BAR ── */}
                                <div className="mt-6 flex flex-wrap items-center gap-3">
                                    <button 
                                        className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all duration-200 text-sm shadow-lg ${
                                            owned 
                                            ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200' 
                                            : 'bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-indigo-300'
                                        }`}
                                        disabled={loadingOwned} 
                                        onClick={() => owned ? remove() : add()}
                                    >
                                        {loadingOwned ? <Spinner /> : owned ? 'Remove from Library' : '+ Add to Library'}
                                    </button>

                                    {owned && (
                                        <div className="w-44 relative z-30">
                                            <DropDownSelect
                                                options={statuses}
                                                icons={[CiClock1, CiCircleMinus, CiCircleCheck, CiCircleQuestion, CiCircleRemove]}
                                                selected={status} setSelected={handleStatus}
                                            />
                                        </div>
                                    )}

                                    {owned && type === 'TV_SERIE' && (
                                        <div className='flex gap-2 flex-1 min-w-[200px] max-w-xs'>
                                            <input 
                                                value={pausedAt || ''} 
                                                onChange={(e) => setPausedAt(e.target.value)} 
                                                type="text" 
                                                placeholder='Paused at: S01E01' 
                                                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm" 
                                            />
                                            <button 
                                                onClick={handlePausedAt} 
                                                disabled={loadingPausedAt} 
                                                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center min-w-[60px] shadow-md"
                                            >
                                                {loadingPausedAt ? <Spinner /> : "Save"}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Overview */}
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Overview</h3>
                                    <p className={`text-slate-600 leading-relaxed ${showMore ? '' : 'line-clamp-4'}`}>
                                        {show.overview}
                                    </p>
                                        <button 
                                            className='mt-2 text-indigo-600 hover:text-indigo-500 text-sm font-medium transition-colors' 
                                            onClick={toggleShowMore}
                                        >
                                            {showMore ? 'Show Less ↑' : 'Read More ↓'}
                                        </button>
                                </div>

                                {/* TV Specific: Seasons */}
                                {type === 'TV_SERIE' && (
                                    <div className="mt-8 glass-panel p-5 rounded-2xl">
                                        <h3 className="text-lg font-semibold text-slate-900 mb-3">Seasons</h3>
                                        <div className="space-y-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                                            {show.seasons?.map((season, index) => (
                                                <div key={index} className='flex justify-between items-center py-2 border-b border-slate-200 last:border-0'>
                                                    <span className="font-medium text-slate-800 text-sm">{season.name}</span>
                                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                                        {season.episode_count} eps
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>{/* end right column */}
                        </div>{/* end two-column row */}
                    </div>{/* end main content */}
                </>
            )}
        </div>
    )
}

export default Show