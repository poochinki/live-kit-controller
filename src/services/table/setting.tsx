/* eslint-disable react-hooks/refs */
import useHydration from '@src/_shared/hooks/web/useHydration';
import { Checkbox } from '@src/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@src/components/ui/dropdown-menu';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@src/components/ui/tooltip';
import { TableColumnsProps } from '@src/models/app';
import {
    ChevronDown,
    Columns3Cog,
    LayoutDashboard,
    Table2,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { TableViewMode } from './type';

type IProps<T> = {
    originalColumns: TableColumnsProps<T>[];
    activeColumns: TableColumnsProps<T>[];
    mode: TableViewMode;
    toggleMode: () => void;
    setColumns: (cols: TableColumnsProps<T>[]) => void;
};

export default function TableSetting<T>({
    mode,
    activeColumns,
    originalColumns,
    toggleMode,
    setColumns,
}: IProps<T>) {
    const hydration = useHydration();
    const t = useTranslations('table-data-component');

    const activeKeysRef = useRef<Set<string>>(
        new Set(activeColumns.map((col) => col.key)),
    );
    activeKeysRef.current = new Set(activeColumns.map((c) => c.key));

    const onCheck = (col: TableColumnsProps<T>, checked: boolean) => {
        const next = checked
            ? [...activeColumns, col]
            : activeColumns.filter((c) => c.key !== col.key);

        const ordered = originalColumns.filter((c) =>
            next.some((n) => n.key === c.key),
        );
        setColumns(ordered);
    };

    return (
        <div className='flex items-center flex-wrap gap-4 min-[785px]:absolute left-4 bottom-3 max-[785px]:ml-2'>
            <DropdownMenu>
                <DropdownMenuTrigger className='flex h-8 items-center text-gray-600 gap-5 bg-gray-100 text-[13px] p-2 rounded-sm hover:cursor-pointer lg:hover:opacity-55'>
                    <div className='flex items-center gap-2'>
                        <Columns3Cog className='text-primary' size={15} />
                        {t('display')}
                    </div>

                    <ChevronDown size={15} />
                </DropdownMenuTrigger>

                <DropdownMenuContent className='p-4 space-y-3 min-w-60'>
                    {originalColumns.map((col) => {
                        const key = col.key;
                        const checked = activeKeysRef.current.has(col.key);

                        return (
                            <div
                                onClick={() => onCheck(col, !checked)}
                                className='flex items-center gap-2 text-sm hover:cursor-pointer lg:hover:text-primary'
                                key={key}
                            >
                                <Checkbox checked={checked} />
                                {col.name}
                            </div>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>

            <div className='size-8 grid place-items-center text-white bg-primary rounded-md'>
                <Tooltip>
                    <TooltipTrigger
                        className='hover:cursor-pointer lg:hover:opacity-55'
                        delay={300}
                        onClick={toggleMode}
                    >
                        {mode === 'table' && !hydration ? (
                            <LayoutDashboard size={18} />
                        ) : (
                            <Table2 size={18} />
                        )}
                    </TooltipTrigger>

                    <TooltipContent>
                        {t(mode === 'table' ? 'list' : 'table')}
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    );
}
