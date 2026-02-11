import React from "react";

const GridItem = ({ item, index }) => {
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-5 gap-y-5 items-center"
            key={index}
        >
            <div
                className={`col-span-5 md:col-span-2 ${
                    (index + 1) % 2 === 0 && "order-last"
                }`}
            >
                <img
                    src={item.img}
                    alt={item.title}
                    className="object-contain w-full"
                />
            </div>
            <div
                className={`col-span-5 md:col-span-3 p-0 ${
                    (index + 1) % 2 === 0
                        ? "md:pr-5 xl:pr-20"
                        : "md:pl-5 xl:pl-20"
                }`}
            >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p
                    dangerouslySetInnerHTML={{
                        __html: item.desc,
                    }}
                />
            </div>
        </div>
    );
};

export default GridItem;
