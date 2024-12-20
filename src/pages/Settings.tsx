import axios from 'axios';
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

const Settings = () => {
  const [cPrice, setCPrice] = useState('0');
  const [creditCnt, setCreditCount] = useState('0');
  const [bcPrice, setBCPrice] = useState('0');
  const [bcreditCnt, setBCreditCount] = useState('0');
  
  useEffect(() => {
    axios.get('/api/getSettingData')
      .then(response => {
        const { setting } = response.data;
        console.log('setting ===>', setting)
        setCreditCount(setting.common.creditCnt);
        setCPrice(setting.common.price);
        setBCreditCount(setting.bonus.creditCnt);
        setBCPrice(setting.bonus.price);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <div className="mx-auto">
        <div className="grid grid-cols-6 gap-10">
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-2 px-3 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Credit
                </h3>
              </div>
              <div className="p-3">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className='w-full sm:w-1/2'>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white w-full"
                      htmlFor="creditCnt"
                    >
                      Credit Count
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      id="creditCnt"
                      placeholder="0"
                      value={creditCnt}
                      onChange={(e) => setCreditCount(e.target.value)}
                    />
                  </div>
                  <div className='w-full sm:w-1/2'>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white w-full"
                      htmlFor="toTM"
                    >
                      Price ( $ )
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      id="toTM"
                      placeholder="0"
                      value={cPrice}
                      onChange={(e) => setCPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                    onClick={async (e) => {
                      e.preventDefault();
                      console.log(creditCnt, cPrice)
                      if(Number(creditCnt) > 0 && Number(cPrice) > 0){
                        try {
                          const result = await axios.post('/api/setCredit', {creditCnt, cPrice});
                          if(result.data.message === 'success')
                            toast.success(`It's set correctly - Credit Count: ${result.data.credit}, Price: $${result.data.price}.`,{
                              duration: 3000,
                              position: 'top-right',
                              style: {
                                background: '#333',
                                color: '#fff',
                              },
                              icon: '👏',
                            });
                          else
                            toast.error(result.data.message);
                        } catch (error) {
                          console.error('Error:', error);
                        }
                      } else {
                        toast.error('Value must be greater than 0.')
                      }
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-2 px-3 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Credit (Bonus)
                </h3>
              </div>
              <div className="p-3">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className='w-full sm:w-1/2'>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white w-full"
                      htmlFor="creditCnt"
                    >
                      Credit Count
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      id="creditCnt"
                      placeholder="0"
                      value={bcreditCnt}
                      onChange={(e) => setBCreditCount(e.target.value)}
                    />
                  </div>
                  <div className='w-full sm:w-1/2'>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white w-full"
                      htmlFor="toTM"
                    >
                      Price ( $ )
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      id="toTM"
                      placeholder="0"
                      value={bcPrice}
                      onChange={(e) => setBCPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                    onClick={async (e) => {
                      e.preventDefault();
                      if(Number(bcreditCnt) > 0 && Number(bcPrice) > 0){
                        try {
                          const result = await axios.post('/api/setBonusCredit', {credit: bcreditCnt, price: bcPrice});
                          if(result.data.message === 'success')
                            toast.success(`It's set correctly - Credit Count: ${result.data.credit}, Price: $${result.data.price}.`,{
                              duration: 3000,
                              position: 'top-right',
                              style: {
                                background: '#333',
                                color: '#fff',
                              },
                              icon: '👏',
                            });
                          else
                            toast.error(result.data.message);
                        } catch (error) {
                          console.error('Error:', error);
                        }
                      } else {
                        toast.error('Value must be greater than 0.')
                      }
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='grid grid-cols-6 gap-10'>
        <div className="col-span-5 xl:col-span-2 mt-5">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Reward USD
              </h3>
            </div>
            <div className="p-7">
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className='w-full flex' style={{alignItems:"center"}}>
                  <label
                    className="block text-sm font-medium text-black dark:text-white m-4"
                    htmlFor="rewardUSD" style={{fontSize: 'x-large'}}
                    >
                      $
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    id="rewardUSD"
                    placeholder="0"
                    value={rewardUSD}
                    onChange={(e) => setRewardUSD(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4.5">
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      const result = await axios.post('/api/setRewardUSD', {rewardUSD});
                      if(result.data.msg === 'success'){
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
                      }
                    } catch (error) {
                      console.error('Error:', error);
                    }
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Settings;
