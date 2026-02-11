const HeaderBox = ({ type = "title", title, subtext, user, actionButton }) => {
    return (
        <header className="w-full grid md:flex items-center justify-between gap-5 flex-wrap">
            <div className="header-box">
                <h1 className="header-box-title">
                    {title}
                    {type === "greeting" && (
                        <span className="text-bankGradient">&nbsp;{user}</span>
                    )}
                </h1>
                <p className="header-box-subtext">{subtext}</p>
            </div>
            <div>{actionButton}</div>
        </header>
    );
};

export default HeaderBox;
