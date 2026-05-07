import s from "./EmptyState.module.css";

export default function EmptyState({ onAdd }) {
  return (
    <div className={s.wrap}>
      <div className={s.graphic}>🎓</div>
      <h2 className={s.title}>Start Your Learning Journey</h2>
      <p className={s.desc}>
        Add your first course, then fill it with tasks, videos, or lectures to track.
      </p>
      <button className={s.btn} onClick={onAdd}>
        + Add Your First Course
      </button>

      <div className={s.tips}>
        <div className={s.tip}><span>📋</span> Add tasks one by one or paste a whole list</div>
        <div className={s.tip}><span>⚡</span> Auto-generate numbered videos instantly</div>
        <div className={s.tip}><span>💾</span> Everything saves automatically in your browser</div>
      </div>
    </div>
  );
}
