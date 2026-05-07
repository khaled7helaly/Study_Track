import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Header from "./components/Header";
import CourseCard from "./components/CourseCard";
import AddCourseModal from "./components/AddCourseModal";
import AddTaskModal from "./components/AddTaskModal";
import EmptyState from "./components/EmptyState";
import s from "./App.module.css";

export default function App() {
  const [courses, setCourses] = useLocalStorage("studytrack_courses_v1", []);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [addTaskFor, setAddTaskFor] = useState(null);

  /* ── Course CRUD ── */
  const handleSaveCourse = (data) => {
    if (editingCourse) {
      setCourses(cs => cs.map(c => c.id === editingCourse.id ? { ...c, ...data } : c));
      setEditingCourse(null);
    } else {
      setCourses(cs => [...cs, { id: crypto.randomUUID(), tasks: [], ...data }]);
    }
  };

  const handleDeleteCourse = (id) => {
    if (confirm("Delete this course and all its tasks?")) {
      setCourses(cs => cs.filter(c => c.id !== id));
    }
  };

  /* ── Task CRUD ── */
  const handleAddTasks = (courseId, newTasks) => {
    setCourses(cs => cs.map(c =>
      c.id === courseId ? { ...c, tasks: [...(c.tasks || []), ...newTasks] } : c
    ));
  };

  const handleToggleTask = (courseId, taskId) => {
    setCourses(cs => cs.map(c =>
      c.id === courseId
        ? { ...c, tasks: c.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t) }
        : c
    ));
  };

  const handleDeleteTask = (courseId, taskId) => {
    setCourses(cs => cs.map(c =>
      c.id === courseId ? { ...c, tasks: c.tasks.filter(t => t.id !== taskId) } : c
    ));
  };

  /* ── Stats ── */
  const totalTasks = courses.reduce((s, c) => s + (c.tasks?.length || 0), 0);
  const totalDone  = courses.reduce((s, c) => s + (c.tasks?.filter(t => t.done).length || 0), 0);

  return (
    <div className={s.app}>
      {/* BG */}
      <div className={s.bgGrid} />
      <div className={s.bgGlow} />

      <Header
        totalDone={totalDone}
        totalTasks={totalTasks}
        onAddCourse={() => setShowAddCourse(true)}
      />

      <main className={s.main}>
        {courses.length === 0 ? (
          <EmptyState onAdd={() => setShowAddCourse(true)} />
        ) : (
          <div className={s.grid}>
            {courses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
                onOpenAddTask={(c) => setAddTaskFor(c)}
                onEdit={(c) => { setEditingCourse(c); setShowAddCourse(true); }}
                onDelete={handleDeleteCourse}
              />
            ))}

            {/* Add course tile */}
            <button className={s.addTile} onClick={() => setShowAddCourse(true)}>
              <span className={s.addTileIcon}>+</span>
              <span>New Course</span>
            </button>
          </div>
        )}
      </main>

      {/* Modals */}
      {showAddCourse && (
        <AddCourseModal
          initial={editingCourse}
          onSave={handleSaveCourse}
          onClose={() => { setShowAddCourse(false); setEditingCourse(null); }}
        />
      )}

      {addTaskFor && (
        <AddTaskModal
          course={addTaskFor}
          onSave={(tasks) => handleAddTasks(addTaskFor.id, tasks)}
          onClose={() => setAddTaskFor(null)}
        />
      )}
    </div>
  );
}
