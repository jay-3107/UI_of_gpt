import React from "react";

const TranslateButton = ({ onTranslate, loading }) => {
  return (
    <button className="translate-btn" onClick={onTranslate} disabled={loading}>
      {loading ? "Translating..." : "Translate"}
    </button>
  );
};

export default TranslateButton;
