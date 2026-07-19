import useHydration from '@src/_shared/hooks/web/useHydration';
import { APP_CONST } from '@src/_shared/constant/app';
import { cn } from '@src/lib/utils';
import { TableColumnsProps } from '@src/models/app';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo } from 'react';
import DataTable, {
    PaginationOptions,
    TableProps,
} from 'react-data-table-component';
import TableEmpty from '../../components/empty';
import useTable from './_hooks/useTable';
import { TableFetching, TableSkeleton } from './loadings';
import TableSetting from './setting';
import { TableName } from './type';

type IProps<T> = {
    tableName: TableName;
    fetching?: boolean;
    loading?: boolean;
    save?: boolean;
    showEmpty?: boolean;
} & TableProps<T>;

export default function Table<T>({
    className,
    tableName,
    data,
    loading,
    fetching,
    save = true,
    columns,
    pagination = true,
    paginationPerPage = APP_CONST.LIMIT_PAGE,
    showEmpty = true,
    ...props
}: IProps<T>) {
    const t = useTranslations('table-data-component');
    const lang = useLocale();

    const hydration = useHydration();
    const originalColumns = columns as TableColumnsProps<T>[];

    const {
        columns: activeColumns,
        setColumns,
        mode,
        toggleMode,
    } = useTable({ tableName, columns: originalColumns, isSavetoLocal: save });

    const paginationComponentOptions: PaginationOptions = useMemo(() => {
        return {
            noRowsPerPage: false,
            selectAllRowsItem: false,
            selectAllRowsItemText: t('all'),
            rangeSeparatorText: t('of'),
            rowsPerPageText: t('rows'),
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang]);

    return (
        <div
            className={cn(
                'relative max-[785px]:pb-4',
                mode === 'list' && !hydration && 'data-in-column',
            )}
        >
            <DataTable
                className={cn('table-component-custom-styles', className)}
                striped
                noHeader
                data={data}
                columns={activeColumns}
                pagination={pagination}
                highlightOnHover
                paginationPerPage={paginationPerPage}
                paginationServer={true}
                paginationComponentOptions={paginationComponentOptions}
                progressPending={loading}
                progressComponent={
                    <TableSkeleton columns={activeColumns?.length} />
                }
                noDataComponent={showEmpty ? <TableEmpty /> : null}
                {...props}
            />

            {!!data?.length && save && (
                <TableSetting
                    originalColumns={originalColumns}
                    activeColumns={activeColumns}
                    setColumns={setColumns}
                    mode={mode}
                    toggleMode={toggleMode}
                />
            )}

            {!loading && fetching && <TableFetching />}
        </div>
    );
}
