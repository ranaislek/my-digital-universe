import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, Image as ImageIcon, Link as LinkIcon, Heading1, Heading2, Quote, Undo, Redo, Code } from 'lucide-react';

interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
    editable?: boolean;
}

const Toolbar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    const btnClass = (isActive: boolean) =>
        `p-2 rounded hover:bg-muted transition-colors ${isActive ? 'bg-primary/20 text-primary' : 'text-muted-foreground'}`;

    const addImage = () => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className="border-b border-border bg-muted/40 p-2 flex gap-1 flex-wrap sticky top-0 z-10 backdrop-blur-sm items-center">
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btnClass(editor.isActive('heading', { level: 1 }))} title="Heading 1"><Heading1 className="w-4 h-4" /></button>
            <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading', { level: 2 }))} title="Heading 2"><Heading2 className="w-4 h-4" /></button>

            <div className="w-px h-4 bg-border mx-1" />

            <button onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))} title="Bold"><Bold className="w-4 h-4" /></button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))} title="Italic"><Italic className="w-4 h-4" /></button>
            <button onClick={() => editor.chain().focus().toggleCode().run()} className={btnClass(editor.isActive('code'))} title="Code"><Code className="w-4 h-4" /></button>

            <div className="w-px h-4 bg-border mx-1" />

            <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))} title="Bullet List"><List className="w-4 h-4" /></button>
            <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive('blockquote'))} title="Quote"><Quote className="w-4 h-4" /></button>

            <div className="w-px h-4 bg-border mx-1" />

            <button onClick={setLink} className={btnClass(editor.isActive('link'))} title="Link"><LinkIcon className="w-4 h-4" /></button>
            <button onClick={addImage} className={btnClass(false)} title="Image"><ImageIcon className="w-4 h-4" /></button>

            <div className="ml-auto flex gap-1">
                <button onClick={() => editor.chain().focus().undo().run()} className={btnClass(false)} title="Undo"><Undo className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().redo().run()} className={btnClass(false)} title="Redo"><Redo className="w-4 h-4" /></button>
            </div>
        </div>
    );
};

const RichTextEditor = ({ content, onChange, editable = true }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Link.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder: 'Start writing your story...' }),
        ],
        content: content,
        editable: editable,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4',
            },
        },
    });

    // Update editor content if prop changes (e.g., loaded from DB)
    useEffect(() => {
        if (editor && content && editor.getHTML() !== content) {
            // Only update if content is meaningfully different to avoid cursor jumps
            // Check if content is just empty tag
            if (content === '<p></p>' && editor.isEmpty) return;
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    return (
        <div className="relative border border-border rounded-lg overflow-hidden focus-within:ring-2 ring-primary/20 transition-all bg-card shadow-sm">
            {editable && <Toolbar editor={editor} />}
            <EditorContent editor={editor} />
        </div>
    );
};

export default RichTextEditor;
