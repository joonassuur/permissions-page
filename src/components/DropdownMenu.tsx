import { useEffect, useRef, useCallback } from 'react';
import { PencilIcon } from '../assets/icons/PencilIcon';
import { BinIcon } from '../assets/icons/BinIcon';
import ListElement from './ListElement';

interface Props {
  onOpen: () => void;
  onClose: () => void;
  open: boolean;
  onEditClick: () => void;
  onRemove: () => void;
}

function DropdownMenu({ onOpen, onClose, open, onEditClick, onRemove }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="inline-flex relative">
      <button
        onClick={() => onOpen()}
        className="inline-flex items-center ml-3 text-sm font-medium text-center text-black-8 rounded-lg focus:outline-none"
        type="button"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>
      {open && (
        <div
          ref={dropdownRef}
          className="z-10 absolute bg-black-2 divide-y divide-gray-100 rounded-lg shadow w-44 top-10 right-1 text-left border border-border"
        >
          <ul
            className="text-sm text-gray-700"
            aria-labelledby="dropdownMenuIconButton"
          >
            <ListElement
              title="Edit details"
              icon={<PencilIcon />}
              onClick={onEditClick}
            />
            <ListElement title="Remove" icon={<BinIcon />} onClick={onRemove} />
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
