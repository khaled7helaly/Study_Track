import { useState } from "react";
import Modal from "./Modal";
import { Input, Btn, ColorPicker, EmojiPicker } from "./FormUI";

export default function AddCourseModal({ onSave, onClose, initial }) {
  const [name, setName] = useState(initial?.name || "");
  const [icon, setIcon] = useState(initial?.icon || "📚");
  const [color, setColor] = useState(initial?.color || "#6366f1");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) { setError("Course name is required"); return; }
    onSave({ name: name.trim(), icon, color });
    onClose();
  };

  return (
    <Modal title={initial ? "Edit Course" : "Add New Course"} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Input
          label="Course Name"
          placeholder="e.g. React, JavaScript, Design..."
          value={name}
          onChange={(e) => { setName(e.target.value); setError(""); }}
          error={error}
          autoFocus
        />
        <EmojiPicker value={icon} onChange={setIcon} />
        <ColorPicker value={color} onChange={setColor} />

        {/* Preview */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "#12141f", border: "1.5px solid #1e2030",
          borderRadius: 10, padding: "10px 14px", marginBottom: 18
        }}>
          <span style={{ fontSize: 22 }}>{icon}</span>
          <span style={{ fontWeight: 700, color: "#fff", fontFamily: "Instrument Sans, sans-serif" }}>{name || "Course Name"}</span>
          <div style={{ marginLeft: "auto", width: 10, height: 10, borderRadius: "50%", background: color }} />
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Btn variant="secondary" type="button" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" type="submit">{initial ? "Save Changes" : "Add Course"}</Btn>
        </div>
      </form>
    </Modal>
  );
}
