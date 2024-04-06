import { MenuItem } from '../types/types';
import { LockIcon } from '../assets/icons/LockIcon';
import { FlagIcon } from '../assets/icons/FlagIcon';
import { MeterIcon } from '../assets/icons/MeterIcon';
import { DocsIcon } from '../assets/icons/DocsIcon';
import { BillingIcon } from '../assets/icons/BillingIcon';
import { ListIcon } from '../assets/icons/ListIcon';
import { MembersIcon } from '../assets/icons/MembersIcon';
import ListElement from './ListElement';
import { PersonIcon } from '../assets/icons/PersonIcon';
import { ChevronBackIcon } from '../assets/icons/ChevronBackIcon';

const menuItems: MenuItem[] = [
  {
    text: 'Members',
    key: 'members',
    route: '#',
    icon: <MembersIcon />,
  },
  {
    text: 'Billing',
    key: 'billing',
    route: '#',
    icon: <BillingIcon />,
  },
  {
    text: 'Questionnaires',
    key: 'questionnaires',
    route: '#',
    icon: <ListIcon />,
  },
  {
    text: 'Docs',
    key: 'docs',
    route: '#',
    icon: <DocsIcon />,
  },
  {
    text: 'Jurisdictional risk',
    key: 'jurisdictionalRisk',
    route: '#',
    icon: <FlagIcon />,
  },
  {
    text: 'Risk assessments',
    key: 'riskAssessments',
    route: '#',
    icon: <MeterIcon />,
  },
  {
    text: 'Permissions',
    key: 'permissions',
    route: '#',
    icon: <LockIcon />,
  },
];

interface Props {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
}

function NavMenu({ showSidebar, setShowSidebar }: Props) {
  return (
    <aside
      id="sidebar"
      className={`transition-all ${
        !showSidebar ? '-translate-x-full' : 'translate-x-0'
      } fixed top-0 left-0 z-40 w-64 h-screen  bg-black-4 border-r border-border`}
      aria-label="Sidebar"
    >
      <div className="h-full px-4 py-8 overflow-y-auto bg-gray-800">
        <div className="flex items-center mb-8">
          <button onClick={() => setShowSidebar(!showSidebar)}>
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
              title={!showSidebar ? '' : text}
              icon={icon}
              onClick={() => {}}
            />
          ))}
        </ul>
        <h6 className="uppercase text-secondary mb-4 text-sm mt-8">Personal</h6>
        <ul className="space-y-2">
          <ListElement
            title="My profile"
            icon={<PersonIcon />}
            onClick={() => {}}
          />
        </ul>
      </div>
    </aside>
  );
}

export default NavMenu;
