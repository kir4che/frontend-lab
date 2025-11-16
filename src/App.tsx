import { BrowserRouter, Route, Routes } from 'react-router';
import { appRoutes } from '@/routes/routeConfig';
import AppLayout from '@/layouts/AppLayout';
import NotFound from '@/pages/not-found';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
        {appRoutes.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
