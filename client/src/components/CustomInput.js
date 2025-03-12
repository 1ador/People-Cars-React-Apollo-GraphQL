import React from "react";
import { Input } from "antd";

const CustomInput = ({ label, required, ...rest }) => {
  return (
    <div className="flex gap-2 items-center">
      <label>
        {required && <span className="text-red-600">*</span>}
        {label}:
      </label>
      <Input {...rest} />
    </div>
  );
};

export default CustomInput;
