'use client';

import AppTooltip from '@src/components/app-tooltip';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@src/components/ui/dropdown-menu';
import { Input } from '@src/components/ui/input';
import type { Editor } from '@tiptap/react';
import { CornerDownLeft, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

type IProps = {
    editor: Editor | null;
};

export default function EditorLink({ editor }: IProps) {
    const [url, setUrl] = useState('');
    const [open, setOpen] = useState(false);

    const onConfirm = () => {
        if (!editor) return;

        if (url) {
            editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: url })
                .run();
        } else {
            editor.chain().focus().unsetLink().run();
        }

        setUrl('');
        setOpen(false);
    };

    const onOpenChange = (nextOpen: boolean) => {
        setOpen(nextOpen);

        if (nextOpen && editor) {
            const previousUrl = editor.getAttributes('link').href || '';
            setUrl(previousUrl);
        }
    };

    return (
        <DropdownMenu open={open} onOpenChange={onOpenChange}>
            <DropdownMenuTrigger nativeButton={false} render={<div />}>
                <AppTooltip content='Link'>
                    <LinkIcon size={14} />
                </AppTooltip>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='w-64 flex items-center gap-4 rounded-2xl px-4 pl-0 '>
                <Input
                    placeholder='https://example.com'
                    value={url}
                    className='border-none outline-0 h-9 text-xs focus-visible:ring-0'
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') onConfirm();
                    }}
                />
                <CornerDownLeft size={16} onClick={onConfirm} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
