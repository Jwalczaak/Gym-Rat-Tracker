import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './paths';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {Object.values(routes).map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
