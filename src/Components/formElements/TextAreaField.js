import React from 'react';

export const TextAreaField = ({
  label,
  name,
  id,
  placeholder,
  error,
  className,
  value,
  disabled,
  onChange,
  style
}) => {
  return (
    <div className="relative mb-1">
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900 mb-1">
        {label}
      </label>
      <textarea
        name={name}
        id={id}
        className={`${className} block w-full rounded-md py-2 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-600 sm:text-sm sm:leading-6 ${error ? 'border-red-500' : ''}`}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        style={style}
      />
      {error && typeof error.message === 'string' && <span className="text-red-500 text-xs">{error.message}</span>}
    </div>
  );
};
