import AppTooltip from '@src/components/app-tooltip';
import { cn } from '@src/lib/utils';
import type { Editor } from '@tiptap/react';
import { List, ListOrdered } from 'lucide-react';

type IProps = {
    editor: Editor | null;
};

export default function EditorList({ editor }: IProps) {
    return (
        <section className='flex items-center gap-4'>
            <AppTooltip content='Bullet List'>
                <div
                    onClick={() =>
                        editor?.chain().focus().toggleBulletList().run()
                    }
                    className={cn(
                        'hover:cursor-pointer',
                        editor?.isActive('bulletList') && 'text-primary',
                    )}
                >
                    <List size={16} />
                </div>
            </AppTooltip>
            <AppTooltip content='Ordered List'>
                <div
                    onClick={() =>
                        editor?.chain().focus().toggleOrderedList().run()
                    }
                    className={cn(
                        'hover:cursor-pointer',
                        editor?.isActive('orderedList') && 'text-primary',
                    )}
                >
                    <ListOrdered size={16} />
                </div>
            </AppTooltip>
        </section>
    );
}
