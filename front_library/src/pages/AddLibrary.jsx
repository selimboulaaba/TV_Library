import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getSearch } from '../services/TMDB'
import Paginator from '../components/Paginator'

function AddLibrary() {

    const [text, setText] = useState('Waiting for API..')
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACK_URL)
            .then(response => {
                setText(response.data)
            })
    }, [])

    const fetchData = (page) => {
        console.log('page= ', page)
        setLoading(true)
        getSearch(search, page)
            .then(response => {
                console.log(response.data)
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
        <div className='grid gap-3 justify-items-center'>
            <div className='text-center mt-4'>{text}</div>
            <form className='w-[90%] sm:w-[80%] md:w-[60%] grid grid-cols-12 gap-3'>
                <input className='border col-span-9 border-gray-700 rounded-xl px-4 py-3 ' placeholder='Search for a Movie/Serie' type='text' value={search} onChange={(event) => { setSearch(event.target.value) }} />
                <button className='col-span-3 font border border-black hover:bg-black hover:text-white rounded-xl py-3' onClick={event => { event.preventDefault(); fetchData(1) }}>Fetch</button>
            </form>
            {loading
                ? <div>Loading..</div>
                : <>
                    <div className='grid grid-cols-12 gap-3 p-5'>
                        {list.length != 0 && list.map(object => (
                            <img className='col-span-3' src={"https://image.tmdb.org/t/p/w500" + object.poster_path} alt={object.title} key={object.id} />
                        ))}
                    </div>
                    {list.length != 0 && <Paginator totalPages={totalPages} currentPage={currentPage} fetchData={fetchData} />}
                </>
            }
        </div>
    )
}

export default AddLibrary