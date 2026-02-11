import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "relative inline-flex max-xl:block items-center p-3 pl-4 rounded text-[16px] leading-5 transition duration-150 ease-in-out focus:outline-none w-full gap-5 " +
                (active
                    ? "bg-[#F5F8FE] text-[#001B42] after:absolute after:w-1 after:h-full after:top-0 after:bottom-0 after:left-0 after:bg-[#001B42] after:rounded-l-full font-[600]"
                    : "text-[#A9A9A9] font-medium") +
                className
            }
        >
            {children}
        </Link>
    );
}
