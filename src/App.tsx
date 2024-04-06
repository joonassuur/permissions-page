import NavMenu from './components/NavMenu';
import PageHeader from './components/PageHeader';
import PermissionsTable from './components/PermissionsTable';
import Chevron from './assets/icons/Chevron';
import { setShowSidebar } from './redux/slices/uiSlice';
import { setAddRoleModalOpen } from './redux/slices/uiSlice';
import { useAppSelector, useAppDispatch } from './redux/reduxHooks';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const showSidebar = useAppSelector((state) => state.ui.showSidebar);

  return (
    <div className="w-screen dark">
      {/* sidebar toggle button */}
      {!showSidebar && (
        <div className="fixed my-auto inset-y-0 align-middle content-center">
          <button
            onClick={() => dispatch(setShowSidebar(true))}
            className="ml-2"
          >
            <Chevron />
          </button>
        </div>
      )}
      {/* sidebar */}
      <NavMenu
        showSidebar={showSidebar}
        setShowSidebar={(value: boolean) => dispatch(setShowSidebar(value))}
      />
      {/* content */}
      <div className={`px-12 ${showSidebar ? 'sm:ml-64' : 'ml-0'} py-8`}>
        <PageHeader
          title="Permissions"
          onButtonClick={() => dispatch(setAddRoleModalOpen(true))}
        />
        <PermissionsTable />
      </div>
    </div>
  );
}

export default App;
