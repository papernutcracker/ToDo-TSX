import React from "react";
import type { Todo } from "../types";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const PRIORITY_LABELS = {
  low: "Низький",
  normal: "Звичайний",
  high: "Високий",
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const isOverdue =
    !todo.completed &&
    Boolean(todo.deadline) &&
    new Date(todo.deadline!) < new Date();

  const itemClasses = [
    styles["todo-item"],
    styles[todo.priority],
    todo.completed ? styles.completed : "",
    isOverdue ? styles.overdue : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={itemClasses}>
      <label className={styles.content}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <div className={styles.info}>
          <span className={styles.text}>{todo.text}</span>
          <div className={styles.meta}>
            <span className={`${styles.tag} ${styles[`tag-${todo.priority}`]}`}>
              {PRIORITY_LABELS[todo.priority]}
            </span>

            {todo.deadline && (
              <span className={styles.deadline}>
                🕒 {new Date(todo.deadline).toLocaleString("uk-UA", {
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}

            {isOverdue && (
              <span className={styles["overdue-badge"]}>Прострочено!</span>
            )}
          </div>
        </div>
      </label>

      <button
        type="button"
        className={styles["delete-button"]}
        onClick={() => onDelete(todo.id)}
        title="Видалити задачу"
      >
        Видалити
      </button>
    </div>
  );
};

export default TodoItem;