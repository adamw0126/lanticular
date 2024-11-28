import Breadcrumb from '../components/Breadcrumb';
import axios from 'axios';
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

const Settings = () => {
  const [quizCnt, setQuizCnt] = useState('0');
  const [memberCnt, setMemberCnt] = useState('0');
  const [fromTm, setFromTm] = useState('1');
  const [toTm, setToTm] = useState('1');
  const [botPrice, setBotPrice] = useState('0');
  const [rewardUSD, setRewardUSD] = useState('0');
  
  useEffect(() => {
    // Fetch data from the backend
    axios.get('/api/getSettingData')
      .then(response => {
        const { quizlmt, from, to, memberlmt, rewardUSD } = response.data;
        setQuizCnt(quizlmt);
        setMemberCnt(memberlmt);
        setFromTm(from);
        setToTm(to);
        setRewardUSD(rewardUSD);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    axios.get('/api/getBotPrice')
      .then(response => {
        const { botPrice } = response.data;
        setBotPrice(botPrice.price);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <div className="mx-auto">

        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-6 gap-10">
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Quiz Limit
                </h3>
              </div>
              <div className="p-7">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className='w-full'>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white w-full"
                      htmlFor="qlmt"
                    >
                      Question Count
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      id="qlmt"
                      placeholder="0"
                      value={quizCnt}
                      onChange={(e) => setQuizCnt(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        const result = await axios.post('/api/setQuestionLmt', {quizCnt: quizCnt});
                        toast.success(`It's set correctly ${result.data.quizlmt}.`,{
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
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Award Member Limit
                </h3>
              </div>
              <div className="p-7">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className='w-full'>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white w-full"
                      htmlFor="mlmt"
                    >
                      Member Count
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      id="mlmt"
                      placeholder="0"
                      value={memberCnt}
                      onChange={(e) => setMemberCnt(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        const result = await axios.post('/api/setQuestionLmt', {memberCnt: memberCnt});
                        toast.success(`It's set correctly ${result.data.memberlmt}.`,{
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
            </div>
          </div>
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Random Interval Range
                </h3>
              </div>
              <div className="p-7">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className='w-full sm:w-1/2'>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white w-full"
                      htmlFor="fromTm"
                    >
                      From
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      id="fromTm"
                      placeholder="1"
                      value={fromTm}
                      onChange={(e) => setFromTm(e.target.value)}
                    />
                  </div>
                  <div className='w-full sm:w-1/2'>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white w-full"
                      htmlFor="toTM"
                    >
                      To
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      id="toTM"
                      placeholder="1"
                      value={toTm}
                      onChange={(e) => setToTm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                    onClick={async (e) => {
                      e.preventDefault();
                      console.log(fromTm, toTm)
                      if(Number(fromTm) >= 1 && Number(toTm) >= 1){
                        try {
                          const result = await axios.post('/api/setQuestionLmt', {from: fromTm, to: toTm});
                          if(result.data.msg === 'success')
                            toast.success(`It's set correctly from ${result.data.from} to ${result.data.to}.`,{
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
                            toast.error(result.data.msg);
                        } catch (error) {
                          console.error('Error:', error);
                        }
                      } else {
                        toast.error('Value must be greater than 1.')
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
        <div className='grid grid-cols-6 gap-10'>
          <div className="col-span-5 xl:col-span-2 mt-5">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Bot Price
                </h3>
              </div>
              <div className="p-7">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className='w-full flex' style={{alignItems:"center"}}>
                    <label
                      className="block text-sm font-medium text-black dark:text-white m-4"
                      htmlFor="botP" style={{fontSize: 'x-large'}}
                      >
                        $
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      id="botP"
                      placeholder="0"
                      value={botPrice}
                      onChange={(e) => setBotPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        const result = await axios.post('/api/setBotPrice', {botPrice});
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
        </div>
      </div>
    </>
  );
};

export default Settings;
