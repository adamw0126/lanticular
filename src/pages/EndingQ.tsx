import Breadcrumb from '../components/Breadcrumb';
import axios from 'axios';
import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';

interface QuizData {
  quiz: string;
  answer: string;
  incAnwser: string;
}

const EndingQ = () => {
  const [addQuestion, setAddQuestion] = useState('');
  const [addAnswer, setAddAnswer] = useState('');
  const [addIncAnswer, setAddIncAnswer] = useState('');
  const [quizData, setquizData] = useState<QuizData[]>([]);
  
  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = function () {
    // Fetch data from the backend
    axios.get('/api/getQuizData')
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

        <Breadcrumb pageName="Final Question & Answer" />

        <div className="grid grid-cols-6 gap-5">
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Add Question
                </h3>
              </div>
              <div className="p-7">
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
                      id="addQ"
                      placeholder="Enter question." rows={4}
                      value={addQuestion}
                      onChange={(e) => setAddQuestion(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">  
                  <div className='w-full'>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white w-full"
                      htmlFor="addCA"
                    >
                      Correct Answer
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      id="addCA"
                      placeholder="Enter correct answer."
                      value={addAnswer}
                      onChange={(e) => setAddAnswer(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">  
                  <div className='w-full'>
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white w-full"
                      htmlFor="addICA"
                    >
                      Incorrect Answers
                    </label>
                    <textarea
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      id="addICA"
                      placeholder="Please enter separately by line." rows={3}
                      value={addIncAnswer}
                      onChange={(e) => setAddIncAnswer(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                    onClick={async (e) => {
                      e.preventDefault();
                      if(addQuestion !== '' && addAnswer !== '' && addIncAnswer !== ''){
                        try {
                          const result = await axios.post('/api/addQuestion', {addQuestion, addAnswer, addIncAnswer});
                          const { msg } = result.data;
                          if(msg === 'success'){
                            toast.success(`It's added correctly.`,{
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
                            getQuestions();
                            setAddQuestion('');
                            setAddAnswer('');
                            setAddIncAnswer('');
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
          <div className="col-span-5 xl:col-span-4">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Questions
                </h3>
              </div>
              <div className="p-5">
                <div className="flex flex-col">
                  <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
                    <div className="p-2.5 text-center">
                      <h5 className="text-sm font-medium uppercase xsm:text-base">Question</h5>
                    </div>
                    <div className="p-2.5 text-center">
                      <h5 className="text-sm font-medium uppercase xsm:text-base">Correct Answer</h5>
                    </div>
                    <div className="p-2.5 text-center">
                      <h5 className="text-sm font-medium uppercase xsm:text-base">Incorrect Answer</h5>
                    </div>
                  </div>
                </div>
                {
                  quizData.map((val, ind) => (
                    <div className="grid grid-cols-4 sm:grid-cols-4" key={ind}>
                      <div className="flex items-center justify-center p-2.5">
                        <p className="text-black dark:text-white">{val.quiz}</p>
                      </div>
                      <div className="flex items-center justify-center p-2.5">
                        <p className="text-black dark:text-white">{val.answer}</p>
                      </div>
                      <div className="flex items-center justify-center p-2.5">
                        <p className="text-black dark:text-white">{val.incAnwser+' '}</p>
                      </div>
                      <div className='flex item-center justify-center p-2.5'>
                        <button
                          className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                          onClick={() => {
                            axios.post('/api/deleteQuiz', val)
                              .then(response => {
                                if(response.data.message === 'success'){
                                  toast.success(`It's deleted correctly.`,{
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
                                  getQuestions();
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
