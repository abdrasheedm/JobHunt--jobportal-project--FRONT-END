import React from 'react'
import { useNavigate } from 'react-router-dom'

function MyJobs() {

    const navigate = useNavigate()
  return (
    <div className=''>
        <div className='px-10 py-20 xl:mx-40 lg:mx-20'>
        <div className=''>
            <button className="bg-myBlue text-white text-lg px-8 py-1 rounded-lg my-5" onClick={() => {navigate('/recruiter-post-job')}}>
              POST A JOB
            </button>
            </div>
            <div>
                <div className="p-5 rounded-md bg-gray-100">
                    <h1 className="text-xl mb-2">MY JOBS</h1>

                    <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                        <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">No.</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left">Job Title</th>
                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Status</th>
                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Posted Date</th>
                        <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Applied</th>
                        <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                        <tr className="bg-white">
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            <a href="#" className="font-bold text-blue-500 hover:underline">10001</a>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            Kring New Fit office chair, mesh + PU, black
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span
                            className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Active</span>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">16/10/2021</td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">$200.00</td>
                        <td className="p-3 text-sm text-red-700 whitespace-nowrap">remove</td>
                        </tr>
                        <tr className="bg-gray-50">
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            <a href="#" className="font-bold text-blue-500 hover:underline">10002</a>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">Kring New Fit office chair, mesh + PU, black</td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span
                            className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">Shipped</span>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">16/10/2021</td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">$200.00</td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">remove</td>

                        </tr>
                        <tr className="bg-white">
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            <a href="#" className="font-bold text-blue-500 hover:underline">10002</a>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">Kring New Fit office chair, mesh + PU, black</td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <span
                            className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">Cancelled</span>
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">16/10/2021</td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">$200.00</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                    <div className="bg-white space-y-3 p-4 rounded-lg shadow">
                        <div className="flex items-center space-x-2 text-sm">
                        <div>
                            <a href="#" className="text-blue-500 font-bold hover:underline">#1000</a>
                        </div>
                        <div className="text-gray-500">10/10/2021</div>
                        <div>
                            <span
                            className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Delivered</span>
                        </div>
                        </div>
                        <div className="text-sm text-gray-700">
                        Kring New Fit office chair, mesh + PU, black
                        </div>
                        <div className="text-sm font-medium text-black">
                        $200.00
                        </div>
                    </div>
                    <div className="bg-white space-y-3 p-4 rounded-lg shadow">
                        <div className="flex items-center space-x-2 text-sm">
                        <div>
                            <a href="#" className="text-blue-500 font-bold hover:underline">#1001</a>
                        </div>
                        <div className="text-gray-500">10/10/2021</div>
                        <div>
                            <span
                            className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">Shipped</span>
                        </div>
                        </div>
                        <div className="text-sm text-gray-700">
                        Kring New Fit office chair, mesh + PU, black
                        </div>
                        <div className="text-sm font-medium text-black">
                        $200.00
                        </div>
                    </div>
                    <div className="bg-white space-y-3 p-4 rounded-lg shadow">
                        <div className="flex items-center space-x-2 text-sm">
                        <div>
                            <a href="#" className="text-blue-500 font-bold hover:underline">#1002</a>
                        </div>
                        <div className="text-gray-500">10/10/2021</div>
                        <div>
                            <span
                            className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">Canceled</span>
                        </div>
                        </div>
                        <div className="text-sm text-gray-700">
                        Kring New Fit office chair, mesh + PU, black
                        </div>
                        <div className="text-sm font-medium text-black">
                        $200.00
                        </div>
                    </div>
                    </div>
                </div>
                
            </div>
        </div>

    </div>
  )
}

export default MyJobs