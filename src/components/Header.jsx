import s from "./Header.module.css";
import img_Horo from "../assets/hero.png"

export default function Header({ totalDone, totalTasks, onAddCourse }) {
  const pct = totalTasks > 0 ? Math.round((totalDone / totalTasks) * 100) : 0;

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className={s.left}>
          <div className={s.logo}>
            <img src={img_Horo} alt="hero" className={s.img_Horo} />
            <span className={s.logoText}>StudyTrack</span>
          </div>
          <p className={s.sub}>Track your progress · stay consistent</p>
        </div>

        <div className={s.stats}>
          <div className={s.statItem}>
            <span className={s.statNum}>{totalDone}</span>
            <span className={s.statLabel}>done</span>
          </div>
          <div className={s.statDivider} />
          <div className={s.statItem}>
            <span className={s.statNum}>{totalTasks - totalDone}</span>
            <span className={s.statLabel}>left</span>
          </div>
          <div className={s.statDivider} />
          <div className={s.statItem}>
            <span className={s.statNum}>{pct}%</span>
            <span className={s.statLabel}>overall</span>
          </div>
        </div>

        <button className={s.addBtn} onClick={onAddCourse}>
          <span>+</span> New Course
        </button>
      </div>

      {/* Global bar */}
      <div className={s.globalBar}>
        <div className={s.globalFill} style={{ width: `${pct}%` }} />
      </div>
    </header>
  );
}
