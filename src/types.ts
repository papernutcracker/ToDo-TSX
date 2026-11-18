export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
  deadline?: string;
}

export type SortOrder = "none" | "asc" | "desc";
export type Priority = "low" | "normal" | "high";