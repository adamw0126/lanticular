import axios from 'axios';
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

// Define the type for an admin object
interface SellList {
    groupName: string;
    solscanUrl: string;
    isPayment: boolean;  // Add a permission field to manage the checkbox value
}

const Selling = () => {
    const [buyers, setBuyers] = useState<SellList[]>([]);  // Explicitly typing this as an array of SellList

    // Fetch admin data from the API
    useEffect(() => {
        axios.get<{ buyers: SellList[] }>('/api/getGroups')  // Typing the Axios response
            .then(res => setBuyers(res.data.buyers))
            .catch(error => {
                console.error('Error fetching data:', error);
                toast.error("Error fetching admin data!");  // Optionally, show an error toast to the user
            });
    }, []);

    const togglePermission = (buyer: string) => {
    setBuyers(prevAdmins =>
        prevAdmins.map(val =>
        val.groupName === buyer ? { ...val, isPayment: !val.isPayment } : val
        )
    );
    axios.post('/api/setGroupPermission', { buyer })
        .then(result => {
            if(result.data.msg === 'success')
                toast.success(`It's set correctly ${result.data.msg}.`,{
                    duration: 4000,
                    position: 'top-right',
                    // Customize styles
                    style: {
                    background: '#333',
                    color: '#fff',
                    },
                    // Add custom icon
                    icon: '👏',
                });
            else
                toast.error(result.data.message);
        })
        .catch(error => {
        console.error('Error fetching data:', error);
        toast.error("Error fetching admin data!");  // Optionally, show an error toast to the user
        });
    };

    return (
        <>
            <div className="grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
                <div className="col-span-12 xl:col-span-12">

                    <div className="rounded-sm border border-stroke bg-white px-5 pt-3 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
                        <div className="flex flex-col">
                            <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
                                <div className="p-2.5 text-center">
                                    <h5 className="text-sm font-medium uppercase xsm:text-base">Who</h5>
                                </div>
                                <div className="p-2.5 text-center">
                                    <h5 className="text-sm font-medium uppercase xsm:text-base">SolscanURL</h5>
                                </div>
                                <div className="hidden p-2.5 text-center sm:block">
                                    <h5 className="text-sm font-medium uppercase xsm:text-base">permission</h5>
                                </div>
                            </div>

                            {buyers.map((elem, i) => (
                                <div className="grid grid-cols-3 sm:grid-cols-3" key={i}>  {/* Use elem.userId as key */}
                                    <div className="flex items-center justify-center p-2.5">
                                        <p className="text-black dark:text-white">{elem.groupName}</p>
                                    </div>

                                    <div className="flex items-center justify-center p-2.5" style={{wordBreak:'break-word'}}>
                                        <p className="text-meta-3">{elem.solscanUrl}</p>
                                    </div>

                                    <div className="hidden items-center justify-center p-2.5 sm:flex">
                                        <div>
                                            <label
                                                htmlFor={`toggle-${elem.groupName}`}  // Unique id for each checkbox
                                                className="flex cursor-pointer select-none items-center"
                                            >
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        id={`toggle-${elem.groupName}`}
                                                        className="sr-only"
                                                        checked={elem.isPayment}  // Controlled by elem.permission
                                                        onChange={() => togglePermission(elem.groupName)}  // Toggle permission
                                                    />
                                                    <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
                                                    <div
                                                        className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${elem.isPayment && '!right-1 !translate-x-full !bg-primary dark:!bg-white'
                                                            }`}
                                                    ></div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Selling;
