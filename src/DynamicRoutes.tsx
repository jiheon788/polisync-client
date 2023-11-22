import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import routerMeta from '@/lib/routerMeta';
import Layout from './components/Layout';

const lazyImport = (pageName: string) => lazy(() => import(`@/pages/${pageName}`));

const pages = Object.keys(routerMeta).map((componentKey: string) => {
  return {
    Component: lazyImport(componentKey),
    path: routerMeta[componentKey].path,
  };
});

interface IDynamicRoutes {
  Component: React.LazyExoticComponent<React.ComponentType<any>>;
  path: string;
}

const DynamicRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      {pages.map(({ Component, path }: IDynamicRoutes) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Component />
            </Suspense>
          }
        />
      ))}
    </Route>
  </Routes>
);

export default DynamicRoutes;
