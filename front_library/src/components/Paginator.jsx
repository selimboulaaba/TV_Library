import React from 'react'
import { AiFillStepBackward } from "react-icons/ai";
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillStepForward } from "react-icons/ai";
function Paginator({ totalPages, currentPage, fetchData }) {
    const defaultBtn = "flex items-center justify-center border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-indigo-600 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm";
    const activeBtn = "flex items-center justify-center border border-indigo-600 bg-indigo-600 text-white font-medium rounded-lg transition-colors shadow-md";
    const iconClass = "h-8 w-8 sm:h-10 sm:w-10 p-2";
    const numClass = "h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center sm:text-lg";

    return (
        <div className='flex flex-wrap items-center justify-center gap-2'>
            <button className={defaultBtn} disabled={currentPage === 1} onClick={() => fetchData(1)}>
                <AiFillStepBackward className={iconClass} />
            </button>
            <button className={defaultBtn} disabled={currentPage === 1} onClick={() => fetchData(currentPage - 1)}>
                <AiFillCaretLeft className={iconClass} />
            </button>

            {currentPage - 2 >= 1 && (
                <button className={`${defaultBtn} hidden sm:flex`} onClick={() => fetchData(1)}>
                    <div className={numClass}>1</div>
                </button>
            )}
            {currentPage - 3 >= 1 && (
                <div className="hidden sm:flex items-center justify-center px-1 text-slate-400">
                    ...
                </div>
            )}
            {currentPage - 1 >= 1 && (
                <button className={defaultBtn} onClick={() => fetchData(currentPage - 1)}>
                    <div className={numClass}>{currentPage - 1}</div>
                </button>
            )}

            <button className={activeBtn} disabled>
                <div className={numClass}>{currentPage}</div>
            </button>

            {currentPage + 1 <= totalPages && (
                <button className={defaultBtn} onClick={() => fetchData(currentPage + 1)}>
                    <div className={numClass}>{currentPage + 1}</div>
                </button>
            )}
            {currentPage + 3 <= totalPages && (
                <div className="hidden sm:flex items-center justify-center px-1 text-slate-400">
                    ...
                </div>
            )}
            {currentPage + 2 <= totalPages && (
                <button className={`${defaultBtn} hidden sm:flex`} onClick={() => fetchData(totalPages)}>
                    <div className={numClass}>{totalPages}</div>
                </button>
            )}

            <button className={defaultBtn} disabled={currentPage === totalPages} onClick={() => fetchData(currentPage + 1)}>
                <AiFillCaretRight className={iconClass} />
            </button>
            <button className={defaultBtn} disabled={currentPage === totalPages} onClick={() => fetchData(totalPages)}>
                <AiFillStepForward className={iconClass} />
            </button>
        </div>
    )
}

export default Paginator