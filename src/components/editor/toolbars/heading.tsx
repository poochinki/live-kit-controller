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
    ChevronDown,
    Heading,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
} from 'lucide-react';
import { useState } from 'react';

type IProps = {
    editor: Editor | null;
};

export default function EditorHeading({ editor }: IProps) {
    const [open, setOpen] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSetHeading = (level: any) => {
        editor?.chain().focus().toggleHeading({ level: level }).run();
        setOpen(false);
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger nativeButton={false} render={<div />}>
                <AppTooltip content='Heading'>
                    <div className='flex items-center'>
                        <Heading size={16} />
                        <ChevronDown size={9} />
                    </div>
                </AppTooltip>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <ScrollArea className='max-h-60'>
                    <DropdownMenuItem
                        onClick={() => onSetHeading(1)}
                        className={cn(
                            'text-xs justify-between',
                            editor?.isActive('heading', { level: 1 }) &&
                                'text-primary',
                        )}
                    >
                        <Heading1 size={16} />
                        Heading1
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onSetHeading(2)}
                        className={cn(
                            'text-xs justify-between',
                            editor?.isActive('heading', { level: 2 }) &&
                                'text-primary',
                        )}
                    >
                        <Heading2 size={16} />
                        Heading2
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onSetHeading(3)}
                        className={cn(
                            'text-xs justify-between',
                            editor?.isActive('heading', { level: 3 }) &&
                                'text-primary',
                        )}
                    >
                        <Heading3 size={16} />
                        Heading3
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onSetHeading(4)}
                        className={cn(
                            'text-xs justify-between',
                            editor?.isActive('heading', { level: 4 }) &&
                                'text-primary',
                        )}
                    >
                        <Heading4 size={16} />
                        Heading4
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onSetHeading(5)}
                        className={cn(
                            'text-xs justify-between',
                            editor?.isActive('heading', { level: 5 }) &&
                                'text-primary',
                        )}
                    >
                        <Heading5 size={16} />
                        Heading5
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => onSetHeading(6)}
                        className={cn(
                            'text-xs justify-between',
                            editor?.isActive('heading', { level: 6 }) &&
                                'text-primary',
                        )}
                    >
                        <Heading6 size={16} />
                        Heading6
                    </DropdownMenuItem>
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
