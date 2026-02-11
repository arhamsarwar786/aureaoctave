import { Link } from "@inertiajs/react";

export const Pagination = ({ links }) => {
    return (
        <nav className="text-center mt-4 space-x-2">
            {links.map((link, index) => (
                <Link
                    key={index}
                    preserveScroll
                    href={link.url || ""}
                    className={
                        "inline-block py-2 px-3 rounded-lg text-gray-900 text-sm hover:text-white border  " +
                        (link.active ? "bg-gray-950 text-white " : " ") +
                        (!link.url
                            ? "!text-gray-500 cursor-not-allowed "
                            : "hover:bg-gray-950")
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}
                ></Link>
            ))}
        </nav>
    );
};
