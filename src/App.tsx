import NavMenu from './components/NavMenu';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAppSelector } from './redux/reduxHooks';
import { menuItems } from './utils';
import './App.css';

function App() {
  const showSidebar = useAppSelector((state) => state.ui.showSidebar);

  return (
    <div className="dark">
      <ErrorBoundary FallbackComponent={() => <div>Something went wrong</div>}>
        <NavMenu />
        {/* content */}
        <div className={`px-10 ${showSidebar ? 'sm:ml-64' : 'ml-0'} py-5`}>
          <Routes>
            {menuItems.map(({ key, element }) => (
              <Route key={key} path={key} element={element} />
            ))}
            <Route path="/profile" element={<div />} />
            <Route path="*" element={<Navigate to="/permissions" replace />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
