import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './paths';
import AppLayout from '../components/shared/AppLayout/AppLayout';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {Object.values(routes).map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
