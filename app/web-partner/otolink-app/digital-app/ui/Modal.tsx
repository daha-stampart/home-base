type ModalProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({
  open,
  title,
  children,
  onClose,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/60 p-4"
     onClick={onClose}
     >
      <div
       onClick={(e) => e.stopPropagation()}
       className="w-full max-w-md max-h-[85vh] overflow-y-auto rounded-[28px] border border-white/20 bg-[#2e2a26] p-6 shadow-2xl"
       >
        <h2 className="mb-4 text-center text-xl font-bold text-white">
          {title}
        </h2>

        {children}

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-red-600 py-3 text-white transition hover:bg-red-700"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}