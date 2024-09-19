import React from 'react'
import '../assets/css/Poster.css'

function Poster({ src, trailer }) {
    const openTrailer = () => {
        const youtubeUrl = `https://www.youtube.com/watch?v=${trailer}`;
        window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
    }

    return (
        <div className="flex md:justify-end justify-center">
            <div className="card">
                <div className="card-info bg-cover" style={{ backgroundImage: `url(${"https://image.tmdb.org/t/p/w500" + src})` }}>
                    {trailer?.key !== '' && <button className="button-play title" onClick={openTrailer}>
                        <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="26px"><path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" fill="currentColor"></path></svg>
                    </button>}
                </div>
            </div>
        </div>
    )
}

export default Poster