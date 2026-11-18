import React from "react";
import styles from "./Counter.module.css";

interface CounterProps {
    totalCount: number;
    completedCount: number;
}

const Counter = ({ totalCount, completedCount }: CounterProps) => {
    return (
        <div className={styles.counter}>
            <span className={styles["counter-label"]}>Всього завдань:</span>
            <span className={styles["todo-count"]}>
                {totalCount} {completedCount > 0 && `(виконано: ${completedCount})`}
            </span>
        </div>
    );
};

export default Counter;