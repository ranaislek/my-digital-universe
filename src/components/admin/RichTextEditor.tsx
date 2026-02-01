import { useEditor, EditorContent } from '@tiptap/react';
import { useEffect, useRef, useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, Image as ImageIcon, Link as LinkIcon, Heading1, Heading2, Quote, Undo, Redo, Code, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
    editable?: boolean;
}

const Toolbar = ({ editor, onImageUpload, isUploading }: { editor: any, onImageUpload: () => void, isUploading: boolean }) => {
    if (!editor) return null;

    const btnClass = (isActive: boolean) =>
        `p-2 rounded hover:bg-muted transition-colors ${isActive ? 'bg-primary/20 text-primary' : 'text-muted-foreground'}`;

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
            <button onClick={onImageUpload} className={btnClass(false)} title="Image" disabled={isUploading}>
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
            </button>

            <div className="ml-auto flex gap-1">
                <button onClick={() => editor.chain().focus().undo().run()} className={btnClass(false)} title="Undo"><Undo className="w-4 h-4" /></button>
                <button onClick={() => editor.chain().focus().redo().run()} className={btnClass(false)} title="Redo"><Redo className="w-4 h-4" /></button>
            </div>
        </div>
    );
};

const RichTextEditor = ({ content, onChange, editable = true }: RichTextEditorProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

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

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        setIsUploading(true);
        try {
            // unique filename
            const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;

            const { data, error } = await supabase
                .storage
                .from('blog-images')
                .upload(filename, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) throw error;

            const { data: { publicUrl } } = supabase
                .storage
                .from('blog-images')
                .getPublicUrl(filename);

            editor?.chain().focus().setImage({ src: publicUrl }).run();
            toast.success('Image uploaded successfully');

        } catch (error: any) {
            console.error('Upload error:', error);
            toast.error(`Upload failed: ${error.message}`);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className="relative border border-border rounded-lg overflow-hidden focus-within:ring-2 ring-primary/20 transition-all bg-card shadow-sm">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
            {editable && <Toolbar editor={editor} onImageUpload={handleImageClick} isUploading={isUploading} />}
            <EditorContent editor={editor} />
        </div>
    );
};

export default RichTextEditor;
