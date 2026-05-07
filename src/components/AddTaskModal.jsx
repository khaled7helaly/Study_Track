import { useState } from "react";
import Modal from "./Modal";
import { Input, Btn } from "./FormUI";
import s from "./AddTaskModal.module.css";

export default function AddTaskModal({ course, onSave, onClose }) {
  const [mode, setMode] = useState("single"); // single | bulk
  const [title, setTitle] = useState("");
  const [bulkText, setBulkText] = useState("");
  const [prefix, setPrefix] = useState("Video");
  const [count, setCount] = useState(10);
  const [error, setError] = useState("");

  const handleSingle = (e) => {
    e.preventDefault();
    if (!title.trim()) { setError("Task title is required"); return; }
    onSave([{ id: crypto.randomUUID(), title: title.trim(), done: false }]);
    onClose();
  };

  const handleBulk = (e) => {
    e.preventDefault();
    const lines = bulkText.split("\n").map(l => l.trim()).filter(Boolean);
    if (!lines.length) { setError("Add at least one task"); return; }
    onSave(lines.map(t => ({ id: crypto.randomUUID(), title: t, done: false })));
    onClose();
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    const n = Math.max(1, Math.min(500, Number(count)));
    const tasks = Array.from({ length: n }, (_, i) => ({
      id: crypto.randomUUID(),
      title: `${prefix} ${i + 1}`,
      done: false,
    }));
    onSave(tasks);
    onClose();
  };

  return (
    <Modal title={`Add Tasks — ${course.icon} ${course.name}`} onClose={onClose}>
      {/* Tabs */}
      <div className={s.tabs}>
        {[["single","Single Task"],["bulk","Paste List"],["generate","Auto Generate"]].map(([v,l]) => (
          <button key={v} className={`${s.tab} ${mode===v ? s.tabActive : ""}`} onClick={() => { setMode(v); setError(""); }}>
            {l}
          </button>
        ))}
      </div>

      {mode === "single" && (
        <form onSubmit={handleSingle}>
          <Input label="Task Title" placeholder="e.g. Intro to Hooks" value={title}
            onChange={e => { setTitle(e.target.value); setError(""); }} error={error} autoFocus />
          <div className={s.actions}>
            <Btn variant="secondary" type="button" onClick={onClose}>Cancel</Btn>
            <Btn variant="primary" type="submit">Add Task</Btn>
          </div>
        </form>
      )}

      {mode === "bulk" && (
        <form onSubmit={handleBulk}>
          <div style={{ marginBottom: 14 }}>
            <label className={s.label}>Paste tasks (one per line)</label>
            <textarea
              className={s.area}
              placeholder={"Intro to React\nJSX Basics\nProps & State\nHooks..."}
              value={bulkText}
              onChange={e => { setBulkText(e.target.value); setError(""); }}
              autoFocus
            />
            {error && <span className={s.err}>{error}</span>}
          </div>
          <div className={s.actions}>
            <Btn variant="secondary" type="button" onClick={onClose}>Cancel</Btn>
            <Btn variant="primary" type="submit">Add All Tasks</Btn>
          </div>
        </form>
      )}

      {mode === "generate" && (
        <form onSubmit={handleGenerate}>
          <Input label="Prefix (e.g. Video, Lecture, Chapter)" value={prefix}
            onChange={e => setPrefix(e.target.value)} autoFocus />
          <Input label="How many?" type="number" min={1} max={500} value={count}
            onChange={e => setCount(e.target.value)} />
          <div className={s.preview}>
            Will generate: <strong>{prefix} 1</strong>, <strong>{prefix} 2</strong> ... <strong>{prefix} {count}</strong>
          </div>
          <div className={s.actions}>
            <Btn variant="secondary" type="button" onClick={onClose}>Cancel</Btn>
            <Btn variant="primary" type="submit">Generate {count} Tasks</Btn>
          </div>
        </form>
      )}
    </Modal>
  );
}
