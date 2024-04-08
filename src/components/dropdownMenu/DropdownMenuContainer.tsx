import { useEffect, useRef, useCallback, useState } from 'react';

interface Props {
  onOpen: () => void;
  onClose: () => void;
  open: boolean;
  children: React.ReactNode;
}

function DropdownMenuContainer({ onOpen, onClose, open, children }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsClosing(true);
        setTimeout(() => {
          onClose();
          setIsClosing(false);
        }, 200);
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside, open]);

  return (
    <div className="inline-flex relative">
      <button
        aria-label="Open dropdown menu"
        id="dropdownMenuIconButton"
        onClick={() => (open ? onClose() : onOpen())}
        className="inline-flex items-center ml-3 font-medium text-center hover:text-purple-4 text-black-8 rounded-lg focus:outline-none"
        type="button"
      >
        <svg
          className="h-4 w-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>
      {open && !isClosing && (
        <div
          ref={dropdownRef}
          role="menu"
          className="dropdownMenu z-10 absolute bg-black-2 divide-y divide-gray-100 rounded-lg shadow w-44 top-10 right-1 text-left border border-border"
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default DropdownMenuContainer;
