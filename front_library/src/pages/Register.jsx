import React, { useEffect, useState } from 'react'
import { regster } from '../services/UserService';
import { Bounce, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { getTrending } from '../services/TMDB';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [bgImage, setBgImage] = useState('');

    useEffect(() => {
        document.title = 'Create Account | TV Library'
    }, [])

    useEffect(() => {
        const fetchBg = async () => {
            try {
                // Fetch a random page of trending movies/tv shows (page 1-5 for variety)
                const randomPage = Math.floor(Math.random() * 5) + 1;
                const response = await getTrending(randomPage);
                const results = response.data.results.filter(item => item.backdrop_path);
                
                if (results.length > 0) {
                    const randomItem = results[Math.floor(Math.random() * results.length)];
                    setBgImage(`https://image.tmdb.org/t/p/original${randomItem.backdrop_path}`);
                }
            } catch (error) {
                console.error("Failed to fetch backdrop:", error);
                // Fallback elegant background if API fails
                setBgImage('https://image.tmdb.org/t/p/original/9l1eZiJHmhr5jIlthMdJN5WYoff.jpg');
            }
        };
        fetchBg();
    }, []);
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      setLoading(true)
      await regster({username, password})
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
                        toast.success('Registered!', {
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
                        navigate('/login')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setLoading(false)
                })
    };
  
    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative transition-all duration-1000 bg-slate-100"
            style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none' }}
        >
          {/* Light Overlay for better contrast */}
          <div className="absolute inset-0 bg-slate-100/60 backdrop-blur-sm z-0"></div>

          <div className="glass-panel p-8 sm:p-10 rounded-2xl w-full max-w-md z-10 mx-4">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h2>
                <p className="text-slate-600 mt-2 text-sm">Join the ultimate TV Library</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full px-4 py-3 bg-white/80 border border-slate-300 shadow-sm rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 bg-white/80 border border-slate-300 shadow-sm rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
                />
              </div>
              <div className="pt-2">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? <Spinner /> : 'Register'}
                </button>
              </div>
              <div className='text-center text-sm pt-4'>
                  <p className="text-slate-600">
                    Already have an account?{' '}
                    <span className='font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-colors'>
                        <Link to="/login">Sign In</Link>
                    </span>
                  </p>
              </div>
            </form>
          </div>
        </div>
      );
    }
    
export default Register;