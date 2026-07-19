import { TABLE_NAME } from '@src/_shared/constant/table';

export type TableName = keyof typeof TABLE_NAME;
export type ColumnsSaved = Record<TableName, string[]>;
export type TableViewMode = 'table' | 'list';
