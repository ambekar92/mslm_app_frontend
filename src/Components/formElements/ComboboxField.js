// import { useState } from 'react'
import React, { useState, useEffect } from "react";
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
// import { Combobox } from '@headlessui/react'

import Combobox from "react-widgets/Combobox";

export const ComboboxField = ({
  id,
  name,
  label,
  placeholder,
  error,
  data,
  setValue,
  getvalue = () => {},
  disabled,
}) => {
  const [selectedData, setSelectedData] = useState(setValue);

  useEffect(() => {
    let obj ={
      ...selectedData,
      'textField':name
    }
    getvalue(obj);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getvalue, selectedData]);

  return (
    <>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <Combobox
        id={id}
        name={name}
        className="dropdownHive w-full rounded-md"
        data={data}
        dataKey="id"
        textField="name"
        defaultValue={1}
        value={setValue}
        onChange={(value) => setSelectedData(value)}
        filter="contains"
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && typeof error.message === "string" && (
        <span className="text-red-500 text-xs">{error.message}</span>
      )}
    </>
  );
};
