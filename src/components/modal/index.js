import React from 'react'

export default function Modal({ children, open, title, extra }) {
    return (
        <div className={`modal ${open ? 'block' : 'hidden'}`}>
            <div className="modal-content w-577 p-8 rounded-lg  border border-[#E6E6E6] bg-[#ffffff]">
                <div className="flex justify-between">
                    <div className='text-xl font-semibold'>
                        {title}
                    </div>
                    {extra}
                </div>
                {children}
            </div>
        </div>
    )
}
