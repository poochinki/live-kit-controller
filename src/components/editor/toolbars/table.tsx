'use client';

import AppTooltip from '@src/components/app-tooltip';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@src/components/ui/dropdown-menu';
import { ScrollArea } from '@src/components/ui/scroll-area';
import { cn } from '@src/lib/utils';
import type { Editor } from '@tiptap/react';
import {
    BetweenHorizonalStart,
    ChevronDown,
    Grid2X2Plus,
    PlusCircle,
    Table,
    Trash,
} from 'lucide-react';
import { useState } from 'react';

type IProps = {
    editor: Editor | null;
};

export default function EditorTable({ editor }: IProps) {
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger nativeButton={false} render={<div />}>
                <AppTooltip content='Table'>
                    <div className='flex items-center'>
                        <Table size={16} />
                        <ChevronDown size={9} />
                    </div>
                </AppTooltip>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <ScrollArea className='max-h-60'>
                    <DropdownMenuItem
                        onClick={() =>
                            editor
                                ?.chain()
                                .focus()
                                .insertTable({
                                    rows: 3,
                                    cols: 3,
                                    withHeaderRow: true,
                                })
                                .run()
                        }
                        className={cn('text-xs justify-between gap-4')}
                    >
                        <PlusCircle size={16} />
                        Insert table
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={() =>
                            editor?.chain().focus().deleteTable().run()
                        }
                        className={cn('text-xs text-red-500 justify-between')}
                    >
                        <Trash size={16} />
                        Delete table
                    </DropdownMenuItem>

                    <p className='text-xs text-gray-500 mt-2'>Columns</p>
                    <DropdownMenuItem
                        onClick={() =>
                            editor?.chain().focus().addColumnBefore().run()
                        }
                        className={cn('text-xs justify-between gap-4')}
                    >
                        <Grid2X2Plus size={16} />
                        Add column before
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() =>
                            editor?.chain().focus().addColumnAfter().run()
                        }
                        className={cn('text-xs justify-between gap-4')}
                    >
                        <Grid2X2Plus size={16} />
                        Add column after
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() =>
                            editor?.chain().focus().deleteColumn().run()
                        }
                        className={cn('text-xs justify-between')}
                    >
                        <Trash size={16} />
                        Delete column
                    </DropdownMenuItem>

                    <p className='text-xs text-gray-500 mt-2'>Rows</p>
                    <DropdownMenuItem
                        onClick={() =>
                            editor?.chain().focus().addRowBefore().run()
                        }
                        className={cn('text-xs justify-between gap-4')}
                    >
                        <BetweenHorizonalStart size={16} />
                        Add row before
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() =>
                            editor?.chain().focus().addRowAfter().run()
                        }
                        className={cn('text-xs justify-between gap-4')}
                    >
                        <BetweenHorizonalStart size={16} />
                        Add row after
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() =>
                            editor?.chain().focus().deleteRow().run()
                        }
                        className={cn('text-xs justify-between')}
                    >
                        <Trash size={16} />
                        Delete row
                    </DropdownMenuItem>
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
