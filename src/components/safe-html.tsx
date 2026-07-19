import DOMPurify from 'dompurify';

export default function SafeHTML({ unsafeHTML }: { unsafeHTML: string }) {
    if (!unsafeHTML) return '';
    const cleanHTML = DOMPurify.sanitize(unsafeHTML);
    return <span dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}
