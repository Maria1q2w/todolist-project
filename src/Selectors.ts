import { createSelector } from 'reselect';
import { AppRootState } from './state/store';

const getTasks = (state: AppRootState) => state.tasks;


export const selectTasksByTodolistId = (todolistId: string) => createSelector(
    [getTasks],
    (tasks) => tasks[todolistId] || []
);
