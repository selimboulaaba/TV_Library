import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getById, getTrailerById } from '../services/TMDB';
import Poster from '../components/Poster';
import Loading from '../components/Loading'
import '../assets/css/addButton.css'
import { addToLibrary, getShow, removeFromLibrary, updatePausedAt, updateStatus } from '../services/ShowService';
import { Bounce, toast } from 'react-toastify';
import ConfirmationPopUp from '../components/ConfirmationPopUp';
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
    const [addModalOpen, setAddModalOpen] = useState(false);
    const closeAddModal = () => {
        setAddModalOpen(false);
        setPassword('')
    }
    const [removeModalOpen, setRemoveModalOpen] = useState(false);
    const closeRemoveModal = () => {
        setRemoveModalOpen(false);
        setPassword('')
    }
    const [password, setPassword] = useState('');
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

    const addShow = () => {
        setAddModalOpen(true)
    }

    const removeShow = () => {
        setRemoveModalOpen(true)
    }

    const toggleShowMore = () => {
        setShowMore(!showMore)
    }

    const add = async () => {
        if (password === '') {
            toast.error('Enter Password!', {
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
            closeAddModal()
            setLoadingOwned(true)
            const payload = {};
            payload.title = show.title ? show.title : show.name
            payload.description = show.overview
            payload.poster = show.poster_path
            payload.date = (type === 'MOVIE') ? show.release_date : show.first_air_date
            payload.type = type
            payload.genre = show.genres.map(genre => genre.name)
            payload.tmdbId = show.id
            payload.password = password

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
    }

    const remove = async () => {
        if (password === '') {
            toast.error('Enter Password!', {
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
            closeRemoveModal()
            setLoadingOwned(true)
            await removeFromLibrary(owned, password)
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
        <div className='mt-[70px] text-center'>
            {loading
                ? <Loading />
                : <div className='grid grid-cols-12 gap-3 pb-20'>
                    <div className='col-span-12 md:col-span-6 md:mr-10 p-1'>
                        <Poster src={show.poster_path} trailer={trailer?.key} />
                        {owned && <div className='block: md:hidden w-[228px] mx-auto mt-5 relative flex items-center justify-center'>
                            <DropDownSelect
                                options={statuses}
                                icons={[CiClock1, CiCircleMinus, CiCircleCheck, CiCircleQuestion, CiCircleRemove]}
                                selected={status} setSelected={handleStatus}
                            />
                        </div>
                        }
                    </div>
                    <div className='text-left col-span-12 md:col-start-7 md:col-span-6 md:pt-16 px-10 md:px-0 md:pr-4'>
                        <div className="block: md:hidden w-full">
                            <button className="add-button mx-auto mt-5 mb-5 w-full" disabled={loadingOwned} onClick={() => owned ? removeShow() : addShow()}>
                                <div className="add-button-top">{loadingOwned ? 'Loading' : owned ? 'Remove' : 'ADD'}</div>
                                <div className="add-button-bottom"></div>
                                <div className="add-button-base"></div>
                            </button>
                        </div>

                        <h1 className='font-bold text-3xl text-[#6e452a] mb-5'>{show.title ? show.title : show.name}</h1>

                        <h1 className={`md:pr-[10vw] xl:pr-[20vw]  ${showMore ? '' : 'line-clamp-4'}`}>{show.overview}</h1>
                        <strong className='hover: cursor-pointer hover:underline' onClick={toggleShowMore}>{showMore ? 'Show Less' : 'Show More'}</strong>
                        <div className="hidden md:block w-full">
                            <button className="add-button mx-auto mt-5" disabled={loadingOwned} onClick={() => owned ? removeShow() : addShow()}>
                                <div className="add-button-top">{loadingOwned ? 'Loading' : owned ? 'Remove' : 'ADD'}</div>
                                <div className="add-button-bottom"></div>
                                <div className="add-button-base"></div>
                            </button>

                            {owned && type === 'TV_SERIE' && <div className="mt-5">
                                <label htmlFor="watched-to-md" className="ml-3">Watched To:</label>
                                <br />
                                <form>
                                    <div className='mt-1 flex'>
                                        <input value={pausedAt || ''} onChange={(event) => setPausedAt(event.target.value)} type="text" id='watched-to-md' placeholder='Where to continue ?' className="py-2 px-3 border-2 border-r-0 border-b-gray-400 focus:outline-none shadow-lg" />
                                        <button onClick={handlePausedAt} disabled={loadingPausedAt} className={`${loadingPausedAt && 'hover:bg-white active:border-2'} min-w-[75px] relative flex items-center justify-center hover:bg-gray-100 hover:text-black active:border bg-white py-2 px-3 border-2 border-b-gray-400 shadow-lg`}>
                                            {loadingPausedAt ? <Spinner /> : "Save"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                            }
                            {owned && <div className='w-[228px] mt-5'>
                                <label htmlFor="watched-to-md" className="ml-3">Watch Status:</label>
                                <DropDownSelect
                                    options={statuses}
                                    icons={[CiClock1, CiCircleMinus, CiCircleCheck, CiCircleQuestion, CiCircleRemove]}
                                    selected={status} setSelected={handleStatus}
                                />
                            </div>
                            }
                        </div>
                    </div>
                    <div className='text-left md:text-center col-span-12 px-10 text-lg'>
                        <div className='font-bold text-[#6e452a]'>Release Date:</div>
                        <div className='text-[16px]'>{(type === 'MOVIE') ? show.release_date : show.first_air_date}</div>
                        <div className='font-bold text-[#6e452a]'>Genre:</div>
                        <div className='text-[16px]'>
                            {show.genres.map((genre, index) => (
                                genre.name + (index !== show.genres.length - 1 ? ', ' : '')
                            ))}
                        </div>
                        {type === 'TV_SERIE' &&
                            <>
                                <div className='font-bold text-[#6e452a]'>Seasons:</div>
                                {show.seasons.map((season, index) => (
                                    <div key={index} className='text-[16px]'>
                                        {"- " + season.name + ": " + season.episode_count + " episodes"}
                                    </div>
                                ))}
                            </>
                        }
                        {owned && type === 'TV_SERIE' && <div className="block md:hidden">
                            <label htmlFor="watched-to-sm" className="font-bold text-[#6e452a]">Watched To:</label>
                            <br />
                            <form>
                                <div className='mt-1 flex w-full sm:w-[70%]'>
                                    <input value={pausedAt || ''} onChange={(event) => setPausedAt(event.target.value)} type="text" id='watched-to-sm' placeholder='Where to continue ?' className="w-[70%] py-2 px-3 border-2 border-r-0 border-b-gray-400 focus:outline-none shadow-lg" />
                                    <button onClick={handlePausedAt} disabled={loadingPausedAt} className={`${loadingPausedAt && 'hover:bg-white active:border-2'} w-[30%] min-w-[75px] relative flex items-center justify-center hover:bg-gray-200 hover:text-black active:border focus bg-white py-2 px-3 border-2 border-b-gray-400 shadow-lg`}>
                                        {loadingPausedAt ? <Spinner /> : "Save"}
                                    </button>
                                </div>
                            </form>
                        </div>
                        }
                    </div>
                </div>
            }
            <ConfirmationPopUp open={addModalOpen} closeModal={closeAddModal} password={password} setPassword={setPassword} accept={add} />
            <ConfirmationPopUp open={removeModalOpen} closeModal={closeRemoveModal} password={password} setPassword={setPassword} accept={remove} />
        </div>
    )
}

export default Show