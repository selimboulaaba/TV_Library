import React, { useState } from 'react'
import { login } from '../services/UserService';
import { Bounce, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
  
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        await login({username, password})
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
                          toast.success('Logged In!', {
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
                          localStorage.setItem('user', response.data.data._id)
                          navigate('/')
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border focus:outline-none border-gray-300 rounded-md shadow-sm focus:ring-[#63422d80] focus:border-[#63422d80] sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border focus:outline-none border-gray-300 rounded-md shadow-sm focus:ring-[#63422d80] focus:border-[#63422d80] sm:text-sm"
                />
              </div>
              <div>
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7f553980] hover:bg-[#63422d80] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#63422d80] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Spinner /> : 'Login'}
                </button>
              </div>
              <div className='text-center text-sm'>
                  <p>Don't have an account? <span className='font-semibold text-[#5f361c80] hover:underline'><Link to="/register">SignUp.</Link></span></p>
              </div>
            </form>
          </div>
        </div>
      );
    }
    
export default Login;