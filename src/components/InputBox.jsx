import React from "react";

const InputBox = ({ inputText, setInputText }) => {
  return (
    <textarea
      className="input-box"
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      placeholder="Enter Sanskrit text..."
    />
  );
};

export default InputBox;
