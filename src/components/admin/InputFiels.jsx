import React from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import he from "he";

const InputField = ({
  type = 'text',
  label,
  name,
  placeholder,
  register,
  error,
  value,
  onChange,
  preview,
  onBlur,
  options = [],
  col = 'col-span-12',
  editPage = false,
  isRequired = true,
}) => {
  const { onBlur: regOnBlur, ...regRest } = register ? register(name, { required: isRequired ? `${label || name} is required` : false }) : {};

  const handleBlur = (e) => {
    if (regOnBlur) regOnBlur(e);
    if (onBlur) onBlur(e);
  };
  return (
    <div className={col}>
      <div className="space-y-1">
        {label && (
          <label className="block font-montserrat font-[600] text-[14px] text-gray-700 tracking-[1px]">
            {label}
          </label>
        )}

        {type === 'editor' ? (
          <ReactQuill
            theme="snow"
            value={editPage ? he.decode(value) : value}
            onChange={onChange}
            className="quill-editor"
          />
        ) : type === 'select' ? (
          <select
            {...regRest}
            onBlur={handleBlur}
            className="bg-white font-montserrat appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--text-primary)] focus:border-transparent focus:z-10 sm:text-sm"
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === 'image' ? (
          <>
            <input
              type="file"
              accept="image/*"
              {...regRest}
              onChange={(e) => {
                if (regRest.onChange) regRest.onChange(e);
                if (onChange) onChange(e);
              }}
              className="form-control bg-white font-montserrat appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--text-primary)] focus:border-transparent focus:z-10 sm:text-sm"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="h-20 mt-2 rounded object-cover"
              />
            )}
          </>
        ) : (
          <input
            type={type}
            {...regRest}
            onBlur={handleBlur}
            className="form-control bg-white font-montserrat appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--text-primary)] focus:border-transparent focus:z-10 sm:text-sm"
            placeholder={placeholder}
          />
        )}

        {error && <p className="text-red-500 text-sm">{error.message}</p>}
      </div>
    </div>
  );
};

export default InputField;
