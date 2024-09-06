//components/EditModal
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => Promise<void>;
  field: string;
  value: string;
  setValue: (value: string) => void;
  theme: string;
  bankList: string[];
}

const EditModal = ({ isOpen, onClose, onSave, field, value, setValue, theme, bankList }: EditModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSaveClick = async () => {
    await onSave();
    onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <h2 className="text-xl font-bold mb-4">Edit {field}</h2>
        {field === 'namaBank' ? (
          <select 
            value={value} 
            onChange={(e) => setValue(e.target.value)}
            className={`w-full p-2 border rounded ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-800'
            }`}
          >
            {bankList.map((bank) => (
              <option key={bank} value={bank}>{bank}</option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`w-full p-2 border rounded ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-800'
            }`}
          />
        )}
        <div className="mt-4 flex justify-end">
          <button 
            onClick={onClose} 
            className={`mr-2 px-4 py-2 rounded ${
              theme === 'dark' 
                ? 'bg-gray-600 text-white hover:bg-gray-500' 
                : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            }`}
          >
            Cancel
          </button>
          <button 
            onClick={handleSaveClick} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};

export default EditModal;