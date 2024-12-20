import { useState } from "react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { lazy } from 'react';
import GoogleLoginComponent from "../../components/GoogleLogin";
import {jwtDecode} from "jwt-decode"; // Fix import

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

  const [token, setToken] = useState(() =>
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))
      : null
  );
  
  const autoLogin = async(signupInfo: any) => {
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
                <div style={{padding:'0.3rem 1.5rem'}}>
                  <div className="mb-2.5">
                    <label className="block dark:text-white">
                      Email
                    </label>
                    <input
                      placeholder="Enter your Email"
                        value={signinInfo.userId}
                        onChange={e => setSigninInfo((data) => {
                          return { ...data, userId: e.target.value };
                        })}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter password"
                        value={signinInfo.password}
                        onChange={e => setSigninInfo((data) => {
                          return { ...data, password: e.target.value };
                        })}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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

                  <div className="jss155"><div className="jss156" data-testid="line-left"></div><span className="jss157">OR</span><div className="jss156" data-testid="line-right"></div></div>

                  <div className="flex justify-center">
                    {/* <button className="button-google flex w-full justify-center rounded p-3 font-medium text-gray mt-4">
                        <img src="icons/google.svg" alt="google login" className="icon-google"></img>
                        <span className="buttonText">Sign in with Google</span>
                    </button> */}
                    <GoogleLoginComponent />
                  </div>
                  
                  <div className="mt-3 mb-1 flex justify-center items-center">
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
              <div  style={{padding:'0.3rem 1.5rem'}}>
                <div className="mb-1.5">
                  <label className="block dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={signupInfo.name}
                    onChange={e => setSignupInfo((data) => {
                      return { ...data, name: e.target.value }
                    })}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-1.5">
                  <label className="block dark:text-white">
                    Email
                  </label>
                  <input
                    placeholder="Enter your Email"
                    value={signupInfo.userId}
                    onChange={e => setSignupInfo((data) => {
                      return { ...data, userId: e.target.value }
                    })}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-1.5">
                  <label className="block dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={signupInfo.password}
                    onChange={e => setSignupInfo((data) => {
                      return { ...data, password: e.target.value }
                    })}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-5.5">
                  <label className="block dark:text-white">
                    Re-type Password
                  </label>
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    value={signupInfo.conform}
                    onChange={e => setSignupInfo((data) => {
                      return { ...data, conform: e.target.value }
                    })}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                      if(result.data.message == 'invalid_email_type'){
                        return toast.error('Invalid Email Type.',{
                          duration: 1500,
                          position: 'top-right'
                        });
                      }
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
              <div className='justify-center flex pb-2 pt-2'>
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
