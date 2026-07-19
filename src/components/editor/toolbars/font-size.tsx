'use client';

import AppTooltip from '@src/components/app-tooltip';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@src/components/ui/dropdown-menu';
import { ScrollArea } from '@src/components/ui/scroll-area';
import type { Editor } from '@tiptap/react';
import { ArrowDownUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

type IProps = {
    editor: Editor | null;
};

export default function EditorFontsize({ editor }: IProps) {
    const [open, setOpen] = useState(false);

    const onSetFontsize = (fontsize: number) => {
        editor?.chain().focus().setFontSize(`${fontsize}px`).run();
        setOpen(false);
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger nativeButton={false} render={<div />}>
                <div className='text-sm flex items-center gap-1'>
                    <AppTooltip content='Font size'>
                        <div className='flex items-center'>
                            <p className='relative'>
                                Aa
                                <ArrowDownUp
                                    className='absolute -top-1 -right-1'
                                    size={8}
                                />
                            </p>
                            <ChevronDown size={9} />
                        </div>
                    </AppTooltip>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <ScrollArea className='max-h-60'>
                    <DropdownMenuItem
                        className='text-xs'
                        onClick={() => onSetFontsize(16)}
                    >
                        Default (16px)
                    </DropdownMenuItem>
                    {Array.from({ length: 70 - 8 + 1 }).map((_, index) => (
                        <DropdownMenuItem
                            onClick={() => onSetFontsize(index + 8)}
                            className='text-xs'
                            key={index}
                        >
                            {index + 8}px
                        </DropdownMenuItem>
                    ))}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
