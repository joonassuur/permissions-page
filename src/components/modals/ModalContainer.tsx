import MainHeader1 from '../headers/MainHeader1';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  title: string;
}

function ModalContainer({ open, setOpen, children, title }: Props) {
  return !open ? null : (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black-1 bg-opacity-50"
    >
      <div className="relative w-full max-w-lg max-h-full">
        <div className="relative bg-black-4  shadow p-10">
          {/* Modal header */}
          <div className="flex items-center justify-betweenborder-b pb-4">
            <MainHeader1 title={title} />
            <button
              onClick={() => setOpen(false)}
              type="button"
              className="bg-transparent text-secondary text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          {children}
        </div>
      </div>
    </div>
  );
}

export default ModalContainer;
