import { useAppDispatch, useAppSelector } from '../redux/reduxHooks';
import { setShowSidebar } from '../redux/slices/uiSlice';
import ListElement from './ListElement';
import Chevron from '../assets/icons/Chevron';
import { PersonIcon } from '../assets/icons/PersonIcon';
import { menuItems } from '../utils';
import { useLocation } from 'react-router-dom';
import { ChevronBackIcon } from '../assets/icons/ChevronBackIcon';

function NavMenu() {
  const showSidebar = useAppSelector((state) => state.ui.showSidebar);
  const location = useLocation();
  const dispatch = useAppDispatch();

  return (
    <div id="sidebar">
      {/* sidebar toggle button */}
      {!showSidebar && (
        <div className="fixed my-auto inset-y-0 align-middle content-center">
          <button
            aria-label="Show sidebar"
            onClick={() => dispatch(setShowSidebar(true))}
            className="ml-2 hover:text-purple-4 text-secondary"
          >
            <Chevron />
          </button>
        </div>
      )}
      {/* sidebar */}
      <aside
        className={`transition-all ${
          !showSidebar ? '-translate-x-full' : 'translate-x-0'
        } fixed top-0 left-0 z-40 w-64 h-screen  bg-black-4 border-r border-border`}
        aria-label="Sidebar"
      >
        <div className="h-full px-5 py-8 overflow-y-auto bg-gray-800">
          <div className="flex items-center mb-8">
            <button
              aria-label="Hide sidebar"
              onClick={() => dispatch(setShowSidebar(!showSidebar))}
            >
              <div className="p-1 rounded-md mr-3 bg-black-2 text-secondary hover:text-purple-4 hover:bg-black-3">
                <ChevronBackIcon />
              </div>
            </button>
            <h1 className="self-center text-lg whitespace-nowrap text-primary">
              Settings
            </h1>
          </div>
          <h6 className="uppercase text-secondary mb-4 text-sm">Company</h6>
          <ul className="space-y-2">
            {menuItems.map(({ text, icon, key }) => (
              <ListElement
                active={location.pathname === `/${key}`}
                key={key}
                route={key}
                title={!showSidebar ? '' : text}
                icon={icon}
              />
            ))}
          </ul>
          <h6 className="uppercase text-secondary mb-4 text-sm mt-8">
            Personal
          </h6>
          <ul className="space-y-2">
            <ListElement
              active={location.pathname === `/profile`}
              title="My profile"
              icon={<PersonIcon />}
              route="profile"
            />
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default NavMenu;
