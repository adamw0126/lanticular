import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ECommerce from './pages/Dashboard/ECommerce';
import Loader from './common/Loader';
import routes from './routes';
import './pages/page.css';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
// Lenticular
const Upload = lazy(() => import('./pages/Lenticular/upload'));
const Image = lazy(() => import('./pages/Lenticular/image'));
const Video = lazy(() => import('./pages/Lenticular/Video'));
const DepthMap = lazy(() => import('./pages/Lenticular/DepthMap'));
const Contact = lazy(() => import('./pages/Lenticular/contact'));
const Account = lazy(() => import('./pages/mypage/Account'));
// const Price = lazy(() => import('./pages/Lenticular/Pricing'));
const Newsroom = lazy(() => import('./pages/Lenticular/Newsroom'));
const Faq = lazy(() => import('./pages/Lenticular/Fap'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const user = localStorage.getItem('userInfo');

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route index path="/" element={<Suspense fallback={<Loader />}><ECommerce /></Suspense>} />
        {
          user == null ? (<>
            <Route index path="/signin" element={<Suspense fallback={<Loader />}><ECommerce /></Suspense>} />
            <Route index path="/signup" element={<Suspense fallback={<Loader />}><ECommerce /></Suspense>} />
          </>) : <Route path="*" element={<Navigate to="/" replace />} />
        }
        {
          user != null ? (<>
            <Route index path="/upload" element={<Suspense fallback={<Loader />}><Upload /></Suspense>} />
            <Route index path="/image" element={<Suspense fallback={<Loader />}><Image /></Suspense>} />
            <Route index path="/video" element={<Suspense fallback={<Loader />}><Video /></Suspense>} />
            <Route index path="/account" element={<Suspense fallback={<Loader />}><Account /></Suspense>} />
            <Route index path="/image/depth-map" element={<Suspense fallback={<Loader/>}><DepthMap/></Suspense>}></Route>
          </>) : <Route path="*" element={<Navigate to="/" replace />} />
        }
        <Route index path="/contact" element={<Suspense fallback={<Loader />}><Contact /></Suspense>} />
        <Route index path="/newsroom" element={<Suspense fallback={<Loader />}><Newsroom /></Suspense>} />
        <Route index path="/faqs" element={<Suspense fallback={<Loader />}><Faq /></Suspense>} />

        {user !== null ? (
          <Route element={<DefaultLayout />}>
            {routes.map((route, index) => {
              const { path, component: Component } = route;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
          </Route>
        ) : (
          // Redirect to login or any other page
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </>
  );
}

export default App;
