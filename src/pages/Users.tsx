import axios from 'axios';
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

// Define the type for an admin object
interface Admin {
  name: string;
  userId: string;
  password: string;
  permission: boolean;  // Add a permission field to manage the checkbox value
}

const Users = () => {
  // State to hold the list of admins
  const [admins, setAdmins] = useState<Admin[]>([]);  // Explicitly typing this as an array of Admin
  const [w_address, SetW_Address] = useState('');
  const [rewardAddress, SetRewardAddress] = useState('');

  // Fetch admin data from the API
  useEffect(() => {
    axios.get<{ admins: Admin[] }>('/api/getAdmins')  // Typing the Axios response
      .then(res => setAdmins(res.data.admins))
      .catch(error => {
        console.error('Error fetching data:', error);
        toast.error("Error fetching admin data!");  // Optionally, show an error toast to the user
      });
    axios.get('/api/getRewardAddress')
      .then(res => SetRewardAddress(res.data.rewardAddress)).catch(error => {
        console.error('Error fetching data:', error);
        toast.error("Error fetching admin data!");  // Optionally, show an error toast to the user
      });
  }, []);

  // Function to toggle the permission of an admin
  const togglePermission = (userId: string) => {
    setAdmins(prevAdmins =>
      prevAdmins.map(admin =>
        admin.userId === userId ? { ...admin, permission: !admin.permission } : admin
      )
    );
    axios.post('/api/setPermission', { userId })
      .then(result => 
        toast.success(`It's set correctly ${result.data.message}.`,{
          duration: 4000,
          position: 'top-right',
          // Customize styles
          style: {
            background: '#333',
            color: '#fff',
          },
          // Add custom icon
          icon: '👏',
        })
      )
      .catch(error => {
        console.error('Error fetching data:', error);
        toast.error("Error fetching admin data!");  // Optionally, show an error toast to the user
      });
  };
  
  const changePassword = (userId: string, ev: any) => {
    setAdmins(prevAdmins =>
      prevAdmins.map(admin =>
        admin.userId === userId ? { ...admin, password: ev.target.value } : admin
      ))
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className='p-3'>
            <div className="mb-3 flex flex-col gap-5.5 sm:flex-row">
              <div className='w-full flex items-center'>
                <label
                  className="block text-sm font-medium text-black dark:text-white text-center"
                  htmlFor="qlmt"
                >
                  Selling wallet address (A wallet that receives payments from bot buyers.)
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  id="qlmt"
                  placeholder="0"
                  value={w_address}
                  onChange={(e) => SetW_Address(e.target.value)}
                />
              </div>
              <button
                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 items-center"
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    const result = await axios.post('/api/setW_Address', {w_address});
                    toast.success(`It's set correctly ${result.data.w_address}.`,{
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
                  } catch (error) {
                    console.error('Error:', error);
                  }
                }}
              >
                Save
              </button>
            </div>
          </div>
          
          <div className='p-3'>
            <div className="mb-3 flex flex-col gap-5.5 sm:flex-row">
              <div className='w-full flex items-center'>
                <label
                  className="block text-sm font-medium text-black dark:text-white text-center"
                  htmlFor="reward"
                >
                  Reward wallet address
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  id="reward"
                  placeholder="0" readOnly
                  value={rewardAddress}
                  onChange={(e) => SetRewardAddress(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Table */}
          <div className="rounded-sm border border-stroke bg-white px-5 pt-3 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
            <div className="flex flex-col">
              <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                <div className="p-2.5 text-center">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
                </div>
                <div className="p-2.5 text-center">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">UserId</h5>
                </div>
                <div className="p-2.5 text-center">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">Password</h5>
                </div>
                <div className="hidden p-2.5 text-center sm:block">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">permission</h5>
                </div>
                <div className="hidden p-2.5 text-center sm:block">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">Change Password</h5>
                </div>
              </div>
              {/* body */}
              {admins.map((admin) => (
                <div className="grid grid-cols-3 sm:grid-cols-5" key={admin.userId}>  {/* Use admin.userId as key */}
                  <div className="flex items-center justify-center p-2.5">
                    <p className="text-black dark:text-white">{admin.name}</p>
                  </div>

                  <div className="flex items-center justify-center p-2.5">
                    <p className="text-meta-3">{admin.userId}</p>
                  </div>

                  <div className="hidden items-center justify-center p-2.5 sm:flex">
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    id="reward"
                    placeholder="Password"
                    value={admin.password}
                    onChange={(e) => changePassword(admin.userId, e)}
                  />
                  </div>

                  <div className="hidden items-center justify-center p-2.5 sm:flex">
                    <div>
                      <label
                        htmlFor={`toggle-${admin.userId}`}  // Unique id for each checkbox
                        className="flex cursor-pointer select-none items-center"
                      >
                        <div className="relative">
                          <input
                            type="checkbox"
                            id={`toggle-${admin.userId}`}
                            className="sr-only"
                            checked={admin.permission}  // Controlled by admin.permission
                            onChange={() => togglePermission(admin.userId)}  // Toggle permission
                          />
                          <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
                          <div
                            className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${admin.permission && '!right-1 !translate-x-full !bg-primary dark:!bg-white'
                              }`}
                          ></div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="hidden items-center justify-center p-2.5 sm:flex">
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 items-center"
                      onClick={async (e) => {
                        e.preventDefault();
                        console.log(admin)
                        try {
                          const result = await axios.post('/api/setAdminPassword', {admin});
                          if(result.data.msg = 'success')
                          toast.success(`It's set correctly ${result.data.w_address}.`,{
                            duration: 2000,
                            position: 'top-right',
                            // Customize styles
                            style: {
                              background: '#333',
                              color: '#fff',
                            },
                            // Add custom icon
                            icon: '👏',
                          });
                        } catch (error) {
                          console.error('Error:', error);
                        }
                      }}
                    >
                      UPDATE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Table */}
        </div>
      </div>
    </>
  );
};

export default Users;
