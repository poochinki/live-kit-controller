import { cn } from '@src/lib/utils';
import CharacterCount from '@tiptap/extension-character-count';
import Image from '@tiptap/extension-image';
import { TableKit } from '@tiptap/extension-table';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyleKit } from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import EditorToolbars from './toolbars';

type Props = {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    className?: string;
    maxLength?: number | null;
};

export default function TipTapEditor({
    value,
    onChange,
    placeholder,
    className,
    maxLength = null,
}: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4, 5, 6],
                },
                link: {
                    openOnClick: false,
                    autolink: true,
                    linkOnPaste: true,
                    defaultProtocol: 'https',
                    protocols: ['http', 'https'],
                    isAllowedUri: (url, ctx) => {
                        try {
                            const parsedUrl = url.includes(':')
                                ? new URL(url)
                                : new URL(`${ctx.defaultProtocol}://${url}`);

                            if (!ctx.defaultValidate(parsedUrl.href)) {
                                return false;
                            }

                            const disallowedProtocols = [
                                'ftp',
                                'file',
                                'mailto',
                            ];
                            const protocol = parsedUrl.protocol.replace(
                                ':',
                                '',
                            );

                            if (disallowedProtocols.includes(protocol)) {
                                return false;
                            }

                            const allowedProtocols = ctx.protocols.map((p) =>
                                typeof p === 'string' ? p : p.scheme,
                            );

                            if (!allowedProtocols.includes(protocol)) {
                                return false;
                            }

                            const disallowedDomains = [
                                'example-phishing.com',
                                'malicious-site.net',
                            ];
                            const domain = parsedUrl.hostname;

                            if (disallowedDomains.includes(domain)) {
                                return false;
                            }

                            return true;
                        } catch {
                            return false;
                        }
                    },
                    shouldAutoLink: (url) => {
                        try {
                            const parsedUrl = url.includes(':')
                                ? new URL(url)
                                : new URL(`https://${url}`);

                            const disallowedDomains = [
                                'example-no-autolink.com',
                                'another-no-autolink.com',
                            ];
                            const domain = parsedUrl.hostname;

                            return !disallowedDomains.includes(domain);
                        } catch {
                            return false;
                        }
                    },
                },
            }),
            Image,
            TextStyleKit,
            CharacterCount.configure({
                limit: maxLength,
            }),
            TableKit.configure({
                table: { resizable: true },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: value || placeholder,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    return (
        <div
            className={cn(
                'bg-white dark:bg-transparent rounded-lg editor',
                className,
            )}
        >
            <EditorToolbars editor={editor} />
            <div className='min-h-50 prose prose-sm'>
                <EditorContent editor={editor} className='p-4' />
            </div>
        </div>
    );
}
