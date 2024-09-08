import React from 'react'
import { AiFillStepBackward } from "react-icons/ai";
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillStepForward } from "react-icons/ai";
function Paginator({ totalPages, currentPage, fetchData }) {
    return (
        <div className='m-10'>
            <div className='flex gap-1'>
                <button className='disabled:bg-gray-300 disabled:border-gray-300 disabled:hover:cursor-default hover:cursor-pointer hover:bg-[#ff5722] border-2 border-gray-500 rounded-lg' disabled={currentPage === 1} onClick={() => fetchData(1)}>
                    <AiFillStepBackward className='h-10 w-10 fill-gray-500 p-2 text-center' />
                </button>
                <button className='disabled:bg-gray-300 disabled:border-gray-300 disabled:hover:cursor-default hover:cursor-pointer hover:bg-[#ff5722] border-2 border-gray-500 rounded-lg' disabled={currentPage === 1} onClick={() => fetchData(currentPage - 1)}>
                    <AiFillCaretLeft className='h-10 w-10 fill-gray-500 p-2 text-center' />
                </button>

                {currentPage - 3 >= 1 && <div className='border-2 border-gray-500 rounded-lg' disabled onClick={() => fetchData(currentPage - 1)}>
                    <div className='h-10 w-10 p-2 text-center text-gray-500 text-xl font-bold flex items-center justify-center'>...</div>
                </div>}
                {currentPage - 2 >= 1 && <div className='hover:cursor-pointer hover:bg-[#ff5722] border-2 border-gray-500 rounded-lg' onClick={() => fetchData(currentPage - 2)}>
                    <div className='h-10 w-10 p-2 text-center text-gray-500 text-xl font-bold flex items-center justify-center'>{currentPage - 2}</div>
                </div>}
                {currentPage - 1 >= 1 && <div className='hover:cursor-pointer hover:bg-[#ff5722] border-2 border-gray-500 rounded-lg' onClick={() => fetchData(currentPage - 1)}>
                    <div className='h-10 w-10 p-2 text-center text-gray-500 text-xl font-bold flex items-center justify-center'>{currentPage - 1}</div>
                </div>}

                <button className='border-2 border-[#ff5722] rounded-lg hover:cursor-default'>
                    <div className='h-10 w-10 p-2 text-[#ff5722] text-center text-xl font-bold flex items-center justify-center'>{currentPage}</div>
                </button>

                {currentPage + 1 <= totalPages && <div className='hover:cursor-pointer hover:bg-[#ff5722] border-2 border-gray-500 rounded-lg' onClick={() => fetchData(currentPage + 1)}>
                    <div className='h-10 w-10 p-2 text-center text-gray-500 text-xl font-bold flex items-center justify-center'>{currentPage + 1}</div>
                </div>}
                {currentPage + 2 <= totalPages && <div className='hover:cursor-pointer hover:bg-[#ff5722] border-2 border-gray-500 rounded-lg' onClick={() => fetchData(currentPage + 2)}>
                    <div className='h-10 w-10 p-2 text-center text-gray-500 text-xl font-bold flex items-center justify-center'>{currentPage + 2}</div>
                </div>}
                {currentPage + 3 <= totalPages && <div className='border-2 border-gray-500 rounded-lg' disabled onClick={() => fetchData(currentPage - 1)}>
                    <div className='h-10 w-10 p-2 text-center text-gray-500 text-xl font-bold flex items-center justify-center'>...</div>
                </div>}

                <button className='disabled:bg-gray-300 disabled:border-gray-300 disabled:hover:cursor-default hover:cursor-pointer hover:bg-[#ff5722] border-2 border-gray-500 rounded-lg' disabled={currentPage === totalPages} onClick={() => fetchData(currentPage + 1)}>
                    <AiFillCaretRight className='h-10 w-10 fill-gray-500 p-2 text-center' />
                </button>
                <button className='disabled:bg-gray-300 disabled:border-gray-300 disabled:hover:cursor-default hover:cursor-pointer hover:bg-[#ff5722] border-2 border-gray-500 rounded-lg' disabled={currentPage === totalPages} onClick={() => fetchData(totalPages)}>
                    <AiFillStepForward className='h-10 w-10 fill-gray-500 p-2 text-center' />
                </button>
            </div>
            <div className='text-center'>{currentPage} / {totalPages}</div>
        </div>
    )
}

export default Paginator