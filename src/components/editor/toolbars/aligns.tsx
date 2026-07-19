import AppTooltip from '@src/components/app-tooltip';
import { cn } from '@src/lib/utils';
import type { Editor } from '@tiptap/react';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';

type IProps = {
    editor: Editor | null;
};

export default function EditorAligns({ editor }: IProps) {
    return (
        <section className='flex items-center gap-4'>
            <AppTooltip content='Align left'>
                <div
                    onClick={() =>
                        editor?.chain().focus().toggleTextAlign('left').run()
                    }
                    className={cn(
                        'hover:cursor-pointer',
                        editor?.isActive({ textAlign: 'left' }) &&
                            'text-primary',
                    )}
                >
                    <AlignLeft size={16} />
                </div>
            </AppTooltip>

            <AppTooltip content='Align center'>
                <div
                    onClick={() =>
                        editor?.chain().focus().toggleTextAlign('center').run()
                    }
                    className={cn(
                        'hover:cursor-pointer',
                        editor?.isActive({ textAlign: 'center' }) &&
                            'text-primary',
                    )}
                >
                    <AlignCenter size={16} />
                </div>
            </AppTooltip>

            <AppTooltip content='Align justify'>
                <div
                    onClick={() =>
                        editor?.chain().focus().toggleTextAlign('justify').run()
                    }
                    className={cn(
                        'hover:cursor-pointer',
                        editor?.isActive({ textAlign: 'justify' }) &&
                            'text-primary',
                    )}
                >
                    <AlignJustify size={16} />
                </div>
            </AppTooltip>

            <AppTooltip content='Align right'>
                <div
                    onClick={() =>
                        editor?.chain().focus().toggleTextAlign('right').run()
                    }
                    className={cn(
                        'hover:cursor-pointer',
                        editor?.isActive({ textAlign: 'right' }) &&
                            'text-primary',
                    )}
                >
                    <AlignRight size={16} />
                </div>
            </AppTooltip>
        </section>
    );
}
