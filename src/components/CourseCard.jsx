import { useState } from "react";
import s from "./CourseCard.module.css";

export default function CourseCard({
  course, onToggleTask, onDeleteTask, onOpenAddTask,
  onEdit, onDelete,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all"); // all | done | todo
  const [search, setSearch] = useState("");

  const tasks = course.tasks || [];
  const done = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  const visible = tasks.filter(t => {
    const matchFilter = filter === "all" || (filter === "done" && t.done) || (filter === "todo" && !t.done);
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className={s.card} style={{ "--accent": course.color }}>
      {/* Header */}
      <div className={s.header}>
        <span className={s.icon}>{course.icon}</span>
        <span className={s.name}>{course.name}</span>
        <span className={s.badge}>{done}/{total}</span>

        {/* Menu */}
        <div className={s.menuWrap}>
          <button className={s.menuBtn} onClick={() => setMenuOpen(v => !v)}>⋯</button>
          {menuOpen && (
            <div className={`${s.menu} animate-slide`} onMouseLeave={() => setMenuOpen(false)}>
              <button onClick={() => { onEdit(course); setMenuOpen(false); }}>✏️ Edit Course</button>
              <button onClick={() => { onOpenAddTask(course); setMenuOpen(false); }}>➕ Add Tasks</button>
              <button className={s.menuDanger} onClick={() => { onDelete(course.id); setMenuOpen(false); }}>🗑️ Delete Course</button>
            </div>
          )}
        </div>

        <button className={s.collapseBtn} onClick={() => setCollapsed(v => !v)}>
          {collapsed ? "▼" : "▲"}
        </button>
      </div>

      {/* Progress */}
      <div className={s.progressSection}>
        <div className={s.barWrap}>
          <div className={s.bar} style={{ width: `${pct}%` }} />
        </div>
        <span className={s.pct}>{pct}%</span>
      </div>

      {/* Body */}
      {!collapsed && (
        <div className={s.body}>
          {total === 0 ? (
            <div className={s.empty}>
              <p>No tasks yet</p>
              <button className={s.addFirstBtn} onClick={() => onOpenAddTask(course)}>
                + Add Tasks
              </button>
            </div>
          ) : (
            <>
              {/* Search + Filter */}
              <div className={s.controls}>
                <input
                  className={s.search}
                  placeholder="Search tasks..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <div className={s.filters}>
                  {["all","todo","done"].map(f => (
                    <button key={f} className={`${s.filterBtn} ${filter===f ? s.filterActive : ""}`}
                      onClick={() => setFilter(f)}>
                      {f === "all" ? `All (${total})` : f === "todo" ? `Todo (${total-done})` : `Done (${done})`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Task list */}
              <div className={s.tasks}>
                {visible.length === 0 && (
                  <p className={s.noResults}>No tasks match</p>
                )}
                {visible.map(task => (
                  <div key={task.id} className={`${s.task} ${task.done ? s.taskDone : ""}`}>
                    <button
                      className={`${s.checkbox} ${task.done ? s.checkboxDone : ""}`}
                      onClick={() => onToggleTask(course.id, task.id)}
                    >
                      {task.done && <span className={s.checkmark}>✓</span>}
                    </button>
                    <span className={s.taskTitle}>{task.title}</span>
                    <button className={s.deleteTask} onClick={() => onDeleteTask(course.id, task.id)} title="Remove">
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Add more */}
              <button className={s.addMoreBtn} onClick={() => onOpenAddTask(course)}>
                + Add More Tasks
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
