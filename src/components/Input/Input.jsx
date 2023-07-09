import "./style.css";
export const Input = ({
    type,
    label,
    value,
    handleChange,
    pattern,
    classNameInput,
    classNameBox,
    classNameLabel,
    defaultValue,
    max,
    title,
}) => {
    return (
        <div className={`relative inputBox ${classNameBox}`}>
            <input
                placeholder=" "
                type={type}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                className={`focus:outline-none w-full border px-3 py-3 rounded-md focus:border-regal-blue  ${classNameInput}`}
                pattern={pattern}
                max={max}
                defaultValue={defaultValue}
                title={title}
            />
            <span
                className={`absolute left-0 mx-2 px-1 my-3 w-fit pointer-events-none transition-all duration-500 rounded-md text-gray-400 ${classNameLabel}`}
            >
                {label}
            </span>
        </div>
    );
};
