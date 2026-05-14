import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                "border-gray-300 border-[#3BF5C4] bg-transparent focus:border-[#3BF5C4]/20 rounded-md shadow-sm dark:border-slate-600 dark:bg-transparent dark:text-white dark:placeholder-slate-400 " +
                className
            }
            ref={input}
        />
    );
});
