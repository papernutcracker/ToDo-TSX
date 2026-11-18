import React, { useState } from "react";
import type { Priority, SortOrder } from "../types";
import styles from "./TodoForm.module.css";

interface TodoFormProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onAdd: (text: string, priority: Priority, deadline: string) => void;
  onToggleSort: () => void;
  sortOrder: SortOrder;
}

const TodoForm: React.FC<TodoFormProps> = ({
  inputValue,
  onInputChange,
  onAdd,
  onToggleSort,
  sortOrder,
}) => {
  const [priority, setPriority] = useState<Priority>("normal");
  const [deadline, setDeadline] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAdd(inputValue, priority, deadline);
    setPriority("normal");
    setDeadline("");
  };

  const sortLabel =
    sortOrder === "asc" ? "А-Я" : sortOrder === "desc" ? "Я-А" : "Сортувати";

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <input
          type="text"
          className={styles.input}
          placeholder="Що потрібно зробити?"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" className={styles["add-button"]}>
          ＋ Додати
        </button>
      </div>

      <div className={styles.row}>
        <select
          className={styles.select}
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="low">🟢 Низький</option>
          <option value="normal">🔵 Звичайний</option>
          <option value="high">🔴 Високий</option>
        </select>

        <input
          type="datetime-local"
          className={styles.datetime}
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          title="Дедлайн завдання"
        />

        <button
          type="button"
          className={styles["sort-button"]}
          onClick={onToggleSort}
        >
          ⇅ {sortLabel}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;