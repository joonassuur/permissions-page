import { useAppDispatch, useAppSelector } from '../redux/reduxHooks';
import { setShowSidebar } from '../redux/slices/uiSlice';
import { MenuItem } from '../types/types';
import { LockIcon } from '../assets/icons/LockIcon';
import { FlagIcon } from '../assets/icons/FlagIcon';
import { MeterIcon } from '../assets/icons/MeterIcon';
import { DocsIcon } from '../assets/icons/DocsIcon';
import { BillingIcon } from '../assets/icons/BillingIcon';
import { ListIcon } from '../assets/icons/ListIcon';
import { MembersIcon } from '../assets/icons/MembersIcon';
import ListElement from './ListElement';
import Chevron from '../assets/icons/Chevron';
import { PersonIcon } from '../assets/icons/PersonIcon';
import { ChevronBackIcon } from '../assets/icons/ChevronBackIcon';

const menuItems: MenuItem[] = [
  {
    text: 'Members',
    key: 'members',
    icon: <MembersIcon />,
  },
  {
    text: 'Billing',
    key: 'billing',
    icon: <BillingIcon />,
  },
  {
    text: 'Questionnaires',
    key: 'questionnaires',
    icon: <ListIcon />,
  },
  {
    text: 'Docs',
    key: 'docs',
    icon: <DocsIcon />,
  },
  {
    text: 'Jurisdictional risk',
    key: 'jurisdictionalRisk',
    icon: <FlagIcon />,
  },
  {
    text: 'Risk assessments',
    key: 'riskAssessments',
    icon: <MeterIcon />,
  },
  {
    text: 'Permissions',
    key: 'permissions',
    icon: <LockIcon />,
  },
];

function NavMenu() {
  const showSidebar = useAppSelector((state) => state.ui.showSidebar);
  const dispatch = useAppDispatch();

  return (
    <div id="sidebar">
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
      <aside
        className={`transition-all ${
          !showSidebar ? '-translate-x-full' : 'translate-x-0'
        } fixed top-0 left-0 z-40 w-64 h-screen  bg-black-4 border-r border-border`}
        aria-label="Sidebar"
      >
        <div className="h-full px-4 py-8 overflow-y-auto bg-gray-800">
          <div className="flex items-center mb-8">
            <button onClick={() => dispatch(setShowSidebar(!showSidebar))}>
              <div className="p-1 rounded-md mr-3 bg-black-2">
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
                key={key}
                route={key}
                title={!showSidebar ? '' : text}
                icon={icon}
                onClick={() => {}}
              />
            ))}
          </ul>
          <h6 className="uppercase text-secondary mb-4 text-sm mt-8">
            Personal
          </h6>
          <ul className="space-y-2">
            <ListElement
              title="My profile"
              icon={<PersonIcon />}
              onClick={() => {}}
              route="aaa"
            />
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default NavMenu;
