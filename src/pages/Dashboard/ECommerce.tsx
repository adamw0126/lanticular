import { useState } from "react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { lazy } from 'react';

const LandingPage = lazy(() => import('../HomeLanding.jsx'));

const FormLayout = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const [signupInfo, setSignupInfo] = useState({
    name: '',
    userId: '',
    password: '',
    conform: ''
  });
  const [signinInfo, setSigninInfo] = useState({
    userId: '',
    password: '',
  });
  
  const autoLogin = async(signupInfo: any) => {
    console.log(123123123123, signupInfo)
    if(!signupInfo.userId || !signupInfo.password)
      return toast.error('Enter information conrrectly.');
    try {
      const result = await axios.post('/api/signin', {signinInfo: signupInfo});
      if(result.data.message === 'success'){
        console.log('result.data ===>', result.data)
        localStorage.setItem('userInfo', JSON.stringify(result.data));
        setTimeout(() => {
          navigate('/upload');
          window.location.reload();
        }, 500);
      } else if(result.data.message === 'permited') {
        return toast.error('Not permission');
      } else {
        return toast.error(result.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>{
      pathname === '/' ?
        <LandingPage />
      : <>
      {
        pathname === '/signin' ? 
        <div className="flex justify-center">
            <div className="mt-30 border text-white border-stroke logWindow">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium dark:text-white">
                Sign in to your account
                </h3>
              </div>
              <div>
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <label className="mb-2.5 block dark:text-white">
                      UserId
                    </label>
                    <input
                      placeholder="Enter your UserId"
                        value={signinInfo.userId}
                        onChange={e => setSigninInfo((data) => {
                          return { ...data, userId: e.target.value };
                        })}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-2.5 block dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter password"
                        value={signinInfo.password}
                        onChange={e => setSigninInfo((data) => {
                          return { ...data, password: e.target.value };
                        })}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray mt-4"
                    onClick={async (e) => {
                          e.preventDefault();
                          if(!signinInfo.userId || !signinInfo.password)
                            return toast.error('Enter information conrrectly.');
                          try {
                            const result = await axios.post('/api/signin', {signinInfo});
                            if(result.data.message === 'success'){
                              toast.success(`SignIn successfuly.`,{
                                duration: 1000,
                                position: 'top-right',
                                style: {
                                  background: '#333',
                                  color: '#fff',
                                },
                                icon: '👏',
                              });
                              localStorage.setItem('userInfo', JSON.stringify(result.data));
                              setTimeout(() => {
                                navigate('/upload');
                                window.location.reload();
                              }, 500);
                            } else if(result.data.message === 'permited') {
                              return toast.error('Not permission');
                            } else {
                              return toast.error(result.data.message);
                            }
                          } catch (error) {
                            console.error('Error:', error);
                          }
                        }}>
                    Sign In
                  </button>
                  
                  <div className="mt-5 flex justify-center items-center">
                    <NavLink to="/signup" className="text-sm text-primary" style={{textDecoration: 'none',color:'#ffd800'}}>
                      Click here to Sign Up
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : <div className="flex justify-center">
          {/* <!-- Sign Up Form --> */}
          <div className="mt-15 border border-stroke shadow-default logWindow">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium dark:text-white">
                Sign Up Form
              </h3>
            </div>
            <div>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={signupInfo.name}
                    onChange={e => setSignupInfo((data) => {
                      return { ...data, name: e.target.value }
                    })}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block dark:text-white">
                    UserId
                  </label>
                  <input
                    placeholder="Enter your UserId"
                    value={signupInfo.userId}
                    onChange={e => setSignupInfo((data) => {
                      return { ...data, userId: e.target.value }
                    })}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={signupInfo.password}
                    onChange={e => setSignupInfo((data) => {
                      return { ...data, password: e.target.value }
                    })}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-5.5">
                  <label className="mb-2.5 block dark:text-white">
                    Re-type Password
                  </label>
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    value={signupInfo.conform}
                    onChange={e => setSignupInfo((data) => {
                      return { ...data, conform: e.target.value }
                    })}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
                  onClick={async (e) => {
                    e.preventDefault();
                    if(!signupInfo.name || !signupInfo.userId || !signupInfo.password || !signupInfo.conform)
                      return toast.error('Enter information conrrectly.');
                    if(signupInfo.password !== signupInfo.conform)
                      return toast.error('Password and Conform must be same.');
                    try {
                      const result = await axios.post('/api/signup', {signupInfo});
                      if(result.data.message === 'Signup successfully'){
                        toast.success(`${result.data.message}`,{
                          duration: 3000,
                          position: 'top-right',
                          style: {
                            background: '#333',
                            color: '#fff',
                          },
                          icon: '👏',
                        });
                        console.log('signupInfo ===>', signupInfo)
                        await autoLogin(signupInfo);
                        // setTimeout(() => {
                        //   navigate('/');
                        // }, 500);
                        // window.location.reload();
                      } else {
                        toast.error(result.data.message);
                      }
                    } catch (error) {
                      console.error('Error:', error);
                    }
                  }}>
                  Sign Up
                </button>
              </div>
              <div className='justify-center flex pb-5'>
                <NavLink to="/signin" className="text-sm text-primary" style={{textDecoration: 'none',color:'#ffd800'}}>
                  Click here to Sign In
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      }
      </>
    }
    </>
  );
};

export default FormLayout;
