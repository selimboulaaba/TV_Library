import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getById, getTrailerById } from '../services/TMDB';
import Poster from '../components/Poster';
import Loading from '../components/Loading'
import '../assets/css/addButton.css'
import { addToLibrary, getShow, removeFromLibrary } from '../services/ShowService';
import { Bounce, toast } from 'react-toastify';
import ConfirmationPopUp from '../components/ConfirmationPopUp';

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
            payload.date = (type === 'movie') ? show.release_date : show.first_air_date
            payload.isMovie = (type === 'movie') ? true : false
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

    return (
        <div className='mt-[70px] text-center'>
            {loading
                ? <Loading />
                : <div className='grid grid-cols-12 gap-3 pb-20'>
                    <div className='col-span-12 md:col-span-6 md:mr-10'>
                        <Poster src={show.poster_path} trailer={trailer?.key} />
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
                        </div>
                    </div>
                    <div className='text-left md:text-center col-span-12 px-10 text-lg'>
                        <div className='font-bold text-[#6e452a]'>Release Date:</div>
                        <div className='text-[16px]'>{(type === 'movie') ? show.release_date : show.first_air_date}</div>
                        <div className='font-bold text-[#6e452a]'>Genre:</div>
                        <div className='text-[16px]'>
                            {show.genres.map((genre, index) => (
                                genre.name + (index !== show.genres.length - 1 ? ', ' : '')
                            ))}
                        </div>
                        {type === 'tv' &&
                            <>
                                <div className='font-bold text-[#6e452a]'>Seasons:</div>
                                {show.seasons.map((season, index) => (
                                    <div key={index} className='text-[16px]'>
                                        {"- " + season.name + ": " + season.episode_count + " episodes"}
                                    </div>
                                ))}
                            </>
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