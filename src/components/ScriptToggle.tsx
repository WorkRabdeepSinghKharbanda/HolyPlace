import { SCRIPT_OPTIONS } from "../lib/transliterate";

interface ScriptToggleProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ScriptToggle({ value, onChange }: ScriptToggleProps) {
  return (
    <select className="toolbar-btn script-select" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="native">Original script</option>
      {SCRIPT_OPTIONS.map((o) => (
        <option key={o.id} value={o.id}>
          {o.label} script
        </option>
      ))}
    </select>
  );
}
