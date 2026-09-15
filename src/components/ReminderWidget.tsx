import { useState } from "react";
import { useReminder } from "../hooks/useReminder";
import { useLang } from "../context/LangContext";

export default function ReminderWidget() {
  const { supported, permission, time, enable, disable } = useReminder();
  const [pickedTime, setPickedTime] = useState(time ?? "08:00");
  const { t } = useLang();

  if (!supported) return <p className="epithet">{t("home_reminder_unsupported")}</p>;

  return (
    <div>
      {time && permission === "granted" ? (
        <div className="chant-toolbar">
          <span className="occasion-tag">{t("home_reminder_active", { time })}</span>
          <button className="toolbar-btn" onClick={disable}>
            {t("home_reminder_disable")}
          </button>
        </div>
      ) : (
        <div className="chant-toolbar">
          <input
            type="time"
            value={pickedTime}
            onChange={(e) => setPickedTime(e.target.value)}
            className="lang-select"
          />
          <button className="toolbar-btn" onClick={() => enable(pickedTime)}>
            {t("home_reminder_enable")}
          </button>
        </div>
      )}
      <p className="epithet" style={{ marginTop: "0.5rem" }}>
        {t("home_reminder_note")}
      </p>
    </div>
  );
}
