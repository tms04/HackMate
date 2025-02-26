/* eslint-disable react/prop-types */

const SelectionButtons = ({ label, options, selectedValue, setValue }) => {
  return (
    <div className="form-control">
      <label className="label">{label}</label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`btn w-full ${
              selectedValue === option ? "btn-accent" : "btn-outline"
            }`}
            onClick={() => setValue(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectionButtons;
