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
const DepthMap = lazy(() => import('./pages/Lenticular/DepthMap'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const user = localStorage.getItem('userInfo');

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
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
            <Route index path="/image/depth-map" element={<Suspense fallback={<Loader/>}><DepthMap/></Suspense>}></Route>
          </>) : <Route path="*" element={<Navigate to="/" replace />} />
        }

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
