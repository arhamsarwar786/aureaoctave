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
                "inline-flex text-white items-center font-medium px-1 pt-1 text-sm leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (active
                    ? "text-primary"
                    : "text-black hover:text-primary focus:text-primary") +
                className
            }
        >
            {children}
        </Link>
    );
}
