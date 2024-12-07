import { useState } from "react";
export function ActionPass({ text, value, onChange }) {
  return (
    <div>
      <div className="flex gap-1">
        <input
          type="checkbox"
          className="accent-purple-500"
          value={value}
          onChange={onChange}
        />
        <span className="text-xs">{text}</span>
      </div>
    </div>
  );
}
