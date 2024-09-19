import React, { useEffect } from 'react'
import Popup from 'reactjs-popup';

function ConfirmationPopUp({ open, closeModal, password, setPassword, accept }) {

    return (
        <Popup open={open} closeOnDocumentClick onClose={closeModal} modal>
            <div className="modal rounded-lg border-4 border-[#6e452a] bg-[#1f1711] py-10 sm:p-10 w-[90vw] md:w-[50vw] text-center">
                <div className="header text-2xl md:text-3xl text-[#6e452a] font-bold text-nowrap text-center">Confirm with Password</div>
                <div className="mt-6 sm:mt-10">
                    <input placeholder="******" type="password" value={password} onChange={event => setPassword(event.target.value)} className="bg-[#292929] border-2 border-[#6e452a] rounded-lg text-white px-6 py-3 text-base hover:border-[#6e452a] cursor-pointer transition" />
                </div>
                <div className="actions grid grid-cols-12 gap-3 mt-3 sm:mt-5 text-xl">
                    <button className="button font-bold hover:underline text-[#6e452a] hover:text-[#544033] col-span-6 sm:col-span-5 md:col-span-4 mx-auto" onClick={accept}>
                        Accept
                    </button>
                    <button className="button font-bold hover:underline text-[#6e452a] hover:text-[#544033] col-span-6 sm:col-start-8 sm:col-span-5 md:col-start-9 md:col-span-4 mx-auto" onClick={closeModal}>
                        Decline
                    </button>
                </div>
            </div>
        </Popup>
    )
}

export default ConfirmationPopUp