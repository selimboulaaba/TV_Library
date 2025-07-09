import React from 'react'
import '../assets/css/NavBar.css'
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

function NavBar() {
    const user = localStorage.getItem('user')
    const navigate = useNavigate();

    const signout = () => {
        localStorage.removeItem('user')
        navigate('/login')
        toast.success('Logged out!', {
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

    if (!user || user === "") {
        return <></>
    }

    return (
        <div className="button-container">
            <Link to='/' >
                <button className="button">
                    <svg
                        className="icon"
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 1024 1024"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"
                        ></path>
                    </svg>
                </button>
            </Link>
            <Link to='/search' >
                <button className="button">
                    <svg
                        className="icon"
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path
                            d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                        ></path>
                    </svg>
                </button>
            </Link>
            <button className="button" onClick={() => signout()}>
                <svg
                    className="icon"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M16 13v-2H7V9l-5 3 5 3v-2h9zm3-11H5c-1.1 0-2 .9-2 2v4h2V4h14v16H5v-4H3v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
                </svg>
            </button>
        </div>
    );
};

export default NavBar