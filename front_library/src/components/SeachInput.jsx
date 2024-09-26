import React from 'react'
import '../assets/css/SearchInput.css'

function SeachInput({ value, setValue }) {
    return (
        <form onSubmit={event => event.preventDefault()} className='pt-5 pb-3 sm:py-0 mr-0 sm:mr-5'>
            <div className="search_container">
                <input type="text" value={value} onChange={event => setValue(event.target.value)} name="text" className="search_input" placeholder="Type to search..." />
                <div className="search_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="search_ionicon" viewBox="0 0 512 512">
                        <title>Search</title>
                        <path d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="32"></path>
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M338.29 338.29L448 448"></path>
                    </svg>
                </div>
            </div>
        </form>
    )
}

export default SeachInput