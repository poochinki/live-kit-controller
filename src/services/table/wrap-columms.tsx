import { TableColumnsProps } from '@src/models/app';

export default function wrapColumnsCell<T>(
    columns: TableColumnsProps<T>[],
): TableColumnsProps<T>[] {
    return columns.map((col) => {
        const originalCell = col.cell;
        return {
            ...col,
            cell: (
                row: T,
                rowIndex: number,
                column: TableColumnsProps<T>,
                id: number,
            ) => (
                <>
                    {col.name && (
                        <b className='data-table-label whitespace-nowrap text-sm'>
                            {col.name}:
                        </b>
                    )}
                    <span>
                        {originalCell
                            ? originalCell(row, rowIndex, column, id)
                            : null}
                    </span>
                </>
            ),
        } as TableColumnsProps<T>;
    });
}
