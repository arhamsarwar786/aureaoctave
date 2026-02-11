export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-block text-center items-center border border-secondary bg-white px-4 py-2 text-xs font-semibold tracking-widest text-secondary transition duration-150 ease-in-out w-full sm:min-w-80 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
