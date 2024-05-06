import React from 'react';

export const InputField = ({
  label,
  name,
  id,
  type = 'text',
  placeholder,
  error,
  className,
  value,
  disabled,
  onChange,
  required,
  maxLength = '',
  readOnly=false,
  extraLabel = ''
}) => {

  return (
    <div className="relative mb-1">
      <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900 infoIconAccordion">
        {label} {required ? "*" : ""} {extraLabel !== ""? <i className="bi bi-info-circle" title={extraLabel}></i>:""} 
      </label>
      <input
        type={type}
        name={name}
        value={value}
        id={id}
        className={`${className} block w-full rounded-md py-2 text-gray-600 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-maroon-600 sm:text-sm sm:leading-6 ${error ? 'border-red-500' : ''}`}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        maxLength={maxLength}
        readOnly = {readOnly}
      />
      {/* {error && typeof error.message === 'string' && <span className="text-red-500 text-xs fieldErrMsg">{error.message}</span>} */}
    </div>
  );
};

