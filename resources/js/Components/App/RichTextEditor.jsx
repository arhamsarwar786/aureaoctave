import { useEffect, useRef } from "react";

const TOOLBAR_ACTIONS = [
    { label: "B", command: "bold", title: "Bold" },
    { label: "I", command: "italic", title: "Italic" },
    { label: "U", command: "underline", title: "Underline" },
    { label: "•", command: "insertUnorderedList", title: "Bulleted list" },
    { label: "1.", command: "insertOrderedList", title: "Numbered list" },
];

export default function RichTextEditor({ value = "", onChange, placeholder = "Write your article here...", disabled = false }) {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || "";
        }
    }, [value]);

    const syncValue = () => {
        if (!editorRef.current) return;
        onChange?.(editorRef.current.innerHTML);
    };

    const applyCommand = (command) => {
        if (disabled) return;

        editorRef.current?.focus();

        if (command === "createLink") {
            const url = window.prompt("Enter the link URL");

            if (!url) return;

            document.execCommand(command, false, url);
            syncValue();
            return;
        }

        document.execCommand(command, false, null);
        syncValue();
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#111820] p-2 text-white">
                {TOOLBAR_ACTIONS.map((action) => (
                    <button
                        key={action.command}
                        type="button"
                        title={action.title}
                        disabled={disabled}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => applyCommand(action.command)}
                        className="min-w-10 rounded-lg border border-slate-200 dark:border-white/10 dark:bg-[#111820] dark:text-white px-3 py-2 text-sm font-semibold text-slate-900/80 transition-colors hover:bg-white/10 hover:text-slate-900/80 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {action.label}
                    </button>
                ))}

                <button
                    type="button"
                    title="Insert link"
                    disabled={disabled}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => applyCommand("createLink")}
                    className="rounded-lg border border-slate-200 dark:border-white/10 dark:bg-[#111820] px-3 py-2 text-sm font-semibold dark:text-white transition-colors hover:bg-white/10 hover:text-slate-900/80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Link
                </button>

                <button
                    type="button"
                    title="Clear formatting"
                    disabled={disabled}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => applyCommand("removeFormat")}
                    className="rounded-lg border border-slate-200 dark:border-white/10 dark:bg-[#111820] px-3 py-2 text-sm font-semibold text-slate-900/80 dark:text-white transition-colors hover:bg-white/10 hover:text-slate-900/80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Clear
                </button>
            </div>

            <div
                ref={editorRef}
                contentEditable={!disabled}
                suppressContentEditableWarning
                onInput={syncValue}
                aria-disabled={disabled}
                data-placeholder={placeholder}
                className="min-h-[280px] rounded-2xl border border-slate-200 dark:border-white/10 dark:bg-[#111820] px-4 py-4 text-sm leading-7 text-slate-900/80 dark:text-white outline-none transition focus:border-[#3BF5C4]/50 aria-disabled:cursor-not-allowed aria-disabled:opacity-70"
                style={{
                    fontFamily: "Poppins, sans-serif",
                }}
            />
        </div>
    );
}
