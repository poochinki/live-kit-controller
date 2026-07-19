// useTable.ts
import { parseJSON } from '@src/lib/utils';
import { TableColumnsProps } from '@src/models/app';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react'; // ✅ thêm useEffect
import { TableName, TableViewMode } from '../type';
import wrapColumnsCell from '../wrap-columms';

type IProps<T> = {
    isSavetoLocal: boolean;
    tableName: TableName;
    columns: TableColumnsProps<T>[];
};

type Return<T> = {
    columns: TableColumnsProps<T>[];
    setColumns: (cols: TableColumnsProps<T>[]) => void;
    mode: TableViewMode;
    toggleMode: () => void;
};

export default function useTable<T>({
    isSavetoLocal,
    tableName,
    columns,
}: IProps<T>): Return<T> {
    const pathname = usePathname();

    const colKey = `${pathname}_table_${tableName}`;
    const modeKey = `${pathname}_table_mode_${tableName}`;

    const wrappedColumns = useMemo(() => wrapColumnsCell(columns), [columns]);

    const [mode, setMode] = useState<TableViewMode>(() => {
        if (!isSavetoLocal || typeof window === 'undefined') return 'table';
        const saved = localStorage.getItem(modeKey);
        return saved === 'list' ? 'list' : 'table';
    });

    const [activeColumns, setActiveColumns] = useState<TableColumnsProps<T>[]>(
        () => {
            if (!isSavetoLocal || typeof window === 'undefined')
                return wrappedColumns;
            const saved = localStorage.getItem(colKey);
            if (!saved) {
                const allKeys = wrappedColumns.map((col) => col.key);
                localStorage.setItem(colKey, JSON.stringify(allKeys));
                return wrappedColumns;
            }
            const keys = parseJSON<string[]>(saved);
            if (!keys) return wrappedColumns;
            return wrappedColumns.filter((col) => keys.includes(col.key));
        },
    );

    useEffect(() => {
        if (!isSavetoLocal) return;

        const saved = localStorage.getItem(colKey);
        if (!saved) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveColumns(wrappedColumns);
            return;
        }
        const keys = parseJSON<string[]>(saved);
        if (!keys) {
            setActiveColumns(wrappedColumns);
            return;
        }
        setActiveColumns(
            wrappedColumns.filter((col) => keys.includes(col.key)),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wrappedColumns]);

    const setColumns = (cols: TableColumnsProps<T>[]) => {
        setActiveColumns(cols);
        if (isSavetoLocal) {
            const keys = cols.map((col) => col.key);
            localStorage.setItem(colKey, JSON.stringify(keys));
        }
    };

    const toggleMode = () => {
        setMode((prev) => {
            const next = prev === 'table' ? 'list' : 'table';
            if (isSavetoLocal) localStorage.setItem(modeKey, next);
            return next;
        });
    };

    if (!isSavetoLocal) {
        return {
            columns: wrappedColumns,
            setColumns: () => {},
            mode,
            toggleMode,
        };
    }

    return { columns: activeColumns, setColumns, mode, toggleMode };
}
