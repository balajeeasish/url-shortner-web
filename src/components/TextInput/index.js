import React from "react";

import "./TextInput.scss";

const TextInput = ({ errorText, ...textBoxProps }) => (
  <div className="text-input-wrapper">
    <input
      {...textBoxProps}
      className={`text-input ${errorText ? "text-input-error" : ""}`}
    />
    {errorText ? (
      <div className="text-input-error-text">{errorText}</div>
    ) : null}
  </div>
);

export default TextInput;
