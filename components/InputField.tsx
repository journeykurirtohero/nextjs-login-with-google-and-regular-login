//components/InputField
import React from 'react';

interface InputFieldProps {
  name: string;
  icon: JSX.Element;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = React.memo(({ name, icon, placeholder, value, onChange }) => (
  <div className="relative">
    <label htmlFor={name} className="block mb-1 text-gray-300 capitalize">{name.replace(/([A-Z])/g, ' $1').trim()}</label>
    <div className="flex items-center">
      {React.cloneElement(icon, { className: "absolute left-3 text-gray-400" })}
      <input
        id={name}
        name={name}
        type={name === 'password' ? 'password' : 'text'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-gray-500"
        required
      />
    </div>
  </div>
));

export default InputField;
