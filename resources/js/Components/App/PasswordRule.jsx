import React from "react";

const PasswordRule = () => {
    return (
        <ul className="grid md:grid-cols-3 gap-4 gap-y-2 mt-2 font-medium text-sm text-[#bdbbbb] list-disc pl-5">
            <li>Use 8 or more characters</li>
            <li>One Uppercase character</li>
            <li>One lowercase character</li>
            <li>One special character</li>
            <li>One number</li>
        </ul>
    );
};

export default PasswordRule;
