export type Filter = 'all' | 'active' | 'completed';

export interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}
