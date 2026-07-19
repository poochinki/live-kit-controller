import { cn } from '@src/lib/utils';
import type { Editor } from '@tiptap/react';
import { Bold, Italic, Strikethrough, Underline } from 'lucide-react';
import EditorUpload from './upload';
import EditorLink from './link';
import EditorFontsize from './font-size';
import EditorHeading from './heading';
import EditorList from './list';
import EditorAligns from './aligns';
import EditorTable from './table';
import AppTooltip from '@src/components/app-tooltip';

type IProps = {
    editor: Editor | null;
};
export default function EditorToolbars({ editor }: IProps) {
    if (!editor) return null;

    return (
        <div className='flex gap-4 p-2 px-4 justify-center items-center flex-wrap border-b border-gray-200 dark:border-[#343B4F]'>
            <EditorHeading editor={editor} />
            <div
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={cn(
                    'lg:hover:opacity-70',
                    editor.isActive('bold') ? 'font-bold text-primary' : '',
                )}
            >
                <AppTooltip content='Font bold'>
                    <Bold size={16} />
                </AppTooltip>
            </div>
            <div
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={cn(
                    'lg:hover:opacity-70',
                    editor.isActive('italic') ? 'font-bold text-primary' : '',
                )}
            >
                <AppTooltip content='Font italic'>
                    <Italic size={16} />
                </AppTooltip>
            </div>
            <div
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={cn(
                    'lg:hover:opacity-70',
                    editor.isActive('strike') ? 'font-bold text-primary' : '',
                )}
            >
                <AppTooltip content='Through line'>
                    <Strikethrough size={16} />
                </AppTooltip>
            </div>
            <div
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={cn(
                    'lg:hover:opacity-70',
                    editor.isActive('underline')
                        ? 'font-bold text-primary'
                        : '',
                )}
            >
                <AppTooltip content='Underline'>
                    <Underline size={16} />
                </AppTooltip>
            </div>

            <EditorFontsize editor={editor} />

            <div className='h-5 w-px bg-gray-100' />

            <EditorLink editor={editor} />
            <EditorTable editor={editor} />

            <div className='h-5 w-px bg-gray-100' />

            <EditorAligns editor={editor} />

            <div className='h-5 w-px bg-gray-100' />

            <EditorList editor={editor} />

            <div className='h-5 w-px bg-gray-100' />

            <EditorUpload editor={editor} />
        </div>
    );
}
