import NavMenu from './components/NavMenu';
import Permissions from './views/Permissions';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './redux/reduxHooks';
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
            <Route path="/" element={<Permissions />} />
            <Route path="/permissions" element={<Permissions />} />
            <Route path="*" element={<div />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default App;
