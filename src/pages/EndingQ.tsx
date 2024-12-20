import axios from 'axios';
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

interface QuizData {
  quiz: string;
  answer: string;
}

const EndingQ = () => {
  const [addQuestion, setAddQuestion] = useState('');
  const [addAnswer, setAddAnswer] = useState('');
  const [quizData, setquizData] = useState<QuizData[]>([]);
  
  useEffect(() => {
    getFAQs();
  }, []);

  const getFAQs = function () {
    axios.get('/api/getFAQsData')
      .then(response => {
        const { quizData } = response.data;
        setquizData(quizData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  return (
    <>
      <div className="mx-auto">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Add FAQs
                </h3>
              </div>
              <div className="p-3">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className='w-full'>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white w-full"
                      htmlFor="addQ"
                    >
                      Question
                    </label>
                    <textarea
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      id="addQ" style={{fontSize:15}}
                      placeholder="Enter question." rows={3}
                      value={addQuestion}
                      onChange={(e) => setAddQuestion(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">  
                  <div className='w-full'>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white w-full"
                      htmlFor="addICA"
                    >
                      Answers
                    </label>
                    <textarea
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      id="addICA" style={{fontSize:15}}
                      placeholder="Enter answer." rows={4}
                      value={addAnswer}
                      onChange={(e) => setAddAnswer(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-small text-gray hover:shadow-1"
                    onClick={async (e) => {
                      e.preventDefault();
                      if(addQuestion !== '' && addAnswer !== ''){
                        try {
                          const result = await axios.post('/api/addFAQ', {addQuestion, addAnswer});
                          const { msg } = result.data;
                          if(msg === 'success'){
                            toast.success(`It's added correctly.`,{
                              duration: 1500,
                              position: 'top-right',
                              style: {
                                background: '#333',
                                color: '#fff',
                              },
                              icon: '👏',
                            });
                            getFAQs();
                            setAddQuestion('');
                            setAddAnswer('');
                          } else
                            toast.error(msg);
                        } catch (error) {
                          console.error('Error:', error);
                        }
                      } else {
                        toast.error('Enter question or answer correctly.');
                      }
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5 xl:col-span-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="p-2">
                <div className="flex flex-col">
                  <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
                    <div className="px-2">
                      <h5 className="text-sm font-medium xsm:text-base">Questions</h5>
                    </div>
                    <div className="px-2">
                      <h5 className="text-sm font-medium xsm:text-base">Answers</h5>
                    </div>
                  </div>
                </div>
                {
                  quizData.map((val, ind) => (
                    <div className="grid grid-cols-3 sm:grid-cols-12" key={ind}>
                      <div className="flex items-center p-1 col-span-5 xl:col-span-3">
                        <p className="text-black dark:text-white" style={{fontSize:15}}>{val.quiz}</p>
                      </div>
                      <div className="flex items-center p-1 col-span-5 xl:col-span-8">
                        <p className="text-black dark:text-white" style={{fontSize:15}}>{val.answer}</p>
                      </div>
                      <div className='flex items-center justify-center p-1'>
                        <button
                          className="flex justify-center items-center rounded bg-primary py-1 px-4 font-small text-gray hover:shadow-1"
                          style={{fontSize:15, height:'max-content'}}
                          onClick={() => {
                            axios.post('/api/deleteFAQ', val)
                              .then(response => {
                                if(response.data.message === 'success'){
                                  toast.success(`It's deleted correctly.`,{
                                    duration: 2000,
                                    position: 'top-right',
                                    style: {
                                      background: '#333',
                                      color: '#fff',
                                    },
                                    icon: '👏',
                                  });
                                  getFAQs();
                                }
                                else
                                  toast.error(response.data.message);
                              })
                              .catch(err => console.log(err));
                          }}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EndingQ;
