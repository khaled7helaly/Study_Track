import s from "./FormUI.module.css";

export function Input({ label, error, ...props }) {
  return (
    <div className={s.field}>
      {label && <label className={s.label}>{label}</label>}
      <input className={`${s.input} ${error ? s.inputError : ""}`} {...props} />
      {error && <span className={s.error}>{error}</span>}
    </div>
  );
}

export function Textarea({ label, error, ...props }) {
  return (
    <div className={s.field}>
      {label && <label className={s.label}>{label}</label>}
      <textarea className={`${s.textarea} ${error ? s.inputError : ""}`} {...props} />
      {error && <span className={s.error}>{error}</span>}
    </div>
  );
}

export function Btn({ variant = "primary", children, ...props }) {
  return (
    <button className={`${s.btn} ${s[variant]}`} {...props}>
      {children}
    </button>
  );
}

const PALETTE = [
  "#6366f1","#8b5cf6","#ec4899","#f43f5e",
  "#f97316","#eab308","#22c55e","#14b8a6",
  "#06b6d4","#3b82f6","#a78bfa","#fb7185",
];

export function ColorPicker({ value, onChange }) {
  return (
    <div className={s.field}>
      <label className={s.label}>Color</label>
      <div className={s.palette}>
        {PALETTE.map((c) => (
          <button
            key={c}
            type="button"
            className={`${s.swatch} ${value === c ? s.swatchActive : ""}`}
            style={{ "--c": c }}
            onClick={() => onChange(c)}
          />
        ))}
      </div>
    </div>
  );
}

export function EmojiPicker({ value, onChange }) {
  const emojis = ["📚","⚛️","📜","🎨","🟢","▲","💨","🔥","🧠","🎯","💻","🛠️","📐","🚀","🎓","⚡","🌐","🔧"];
  return (
    <div className={s.field}>
      <label className={s.label}>Icon</label>
      <div className={s.emojiGrid}>
        {emojis.map((e) => (
          <button
            key={e}
            type="button"
            className={`${s.emojiBtn} ${value === e ? s.emojiBtnActive : ""}`}
            onClick={() => onChange(e)}
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  );
}
