import React from 'react';

const SelectField = ({ label, name, options, register }) => {
  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <select
          {...register(name, { required: true })}
          className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:border-blue-400 transition-all duration-200 text-gray-700 cursor-pointer [&>*]:bg-white [&>*]:p-2 [&>*]:text-gray-700"
          style={{
            WebkitAppearance: 'menulist',
            MozAppearance: 'menulist',
            appearance: 'menulist'
          }}
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value} 
              className="py-2 px-3 hover:bg-blue-50"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectField;