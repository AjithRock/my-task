import React from 'react'



function currencyFormat(number) {
    return number.toString().split('.')[0].length > 3 ? number.toString().substring(0, number.toString().split('.')[0].length - 3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + number.toString().substring(number.toString().split('.')[0].length - 3) : number.toString();
}


export default function Card({ data, onApply }) {

    const { id, jobTitle, companyAvatar, companyName, salaryMin, salaryMax, totalEmployees, applyType, experienceMin, experienceMax, industry, remoteType, location } = data
    return (
        <div className="bg-white w-830 py-4 px-6 h-80 rounded-lg flex justify-between">
            <div className="flex justify-between">
                <div>
                    <img alt="logo" className='w-12 h-12' src={companyAvatar} />
                </div>
                <div className="ml-2">
                    <div>
                        <div className="text-lg font-semibold">
                            {jobTitle}
                        </div>
                        <p className='text-base'>{companyName} - {industry}</p>
                        <p className='text-base'>{location} ({remoteType})</p>
                    </div>
                    <div className='mt-6'>
                        Part Time (9.00 am - 5.00 pm IST)
                    </div>
                    <div className='mt-2'>
                        Experience ({experienceMin}-{experienceMax} Year)
                    </div>
                    <div className='mt-2'>
                        INR (₹) ${currencyFormat(salaryMin)} - ${currencyFormat(salaryMax)} / Month
                    </div>
                    <div className='mb-6 mt-2'>
                        {totalEmployees} Employees
                    </div>
                    <div>
                        <button className='bg-[#1597E4] text-white  py-2 px-4 rounded' onClick={() => onApply(id)}>
                            Apply Now
                        </button>
                        {applyType && <button className='bg-transparent text-[#1597E4] py-2 px-4 border border-[#1597E4] rounded ml-6'>
                            {applyType}
                        </button>}
                    </div>
                </div>
            </div>
            <div className="md:w-96 w-0 md:block hidden">

            </div>
        </div>
    )
}
