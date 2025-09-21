"use client";
import Select, { components } from "react-select";
import "./scroll.css";

type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  options: Option[];
  placeholder?: string;
  onChange?: (selected: Option[]) => void;
};

export default function MultiSelect({
  options,
  placeholder = "Select one...",
  onChange,
}: MultiSelectProps) {
  return (
    <Select
      options={options}
      isMulti
      placeholder={placeholder}
      classNamePrefix="custom-select"
      onChange={(selected) => onChange?.(selected as Option[])}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{
        Option: (props) => (
          <components.Option {...props}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                border: props.isSelected
                  ? "1px solid #ff9eb5"
                  : "1px solid rgba(0,0,0,0.2)",
                borderRadius: "4px",
                width: "18px",
                height: "18px",
                marginRight: "8px",
                backgroundColor: props.isSelected
                  ? "#ff9eb5"
                  : "rgba(0,0,0,0.05)",
                transition: "all 0.2s",
              }}
            >
              {props.isSelected && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="14"
                  height="14"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
            <span>{props.label}</span>
          </components.Option>
        ),
        IndicatorSeparator: () => null,
      }}
      styles={{
        control: (base) => ({
          ...base,
          borderRadius: "10px",
          padding: "4px 6px",
          backgroundColor: "#f5f5f5",
          border: "none",
          boxShadow: "none",
          width: "560px",
          zIndex: "9999",
        }),
        valueContainer: (base) => ({
          ...base,
          gap: "6px",
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: "#eaeaea",
          borderRadius: "12px",
          padding: "2px 6px",
        }),
        multiValueLabel: (base) => ({
          ...base,
          fontWeight: 500,
        }),
        multiValueRemove: (base) => ({
          ...base,
          display: "none",
        }),
        option: (base, state) => ({
          ...base,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: state.isFocused ? "#f0f0f0" : "transparent",
          color: "#000",
          cursor: "pointer",
          padding: "10px 12px",
          borderRadius: "8px",
          "&:active": {
            backgroundColor: "rgba(0,0,0,0.1)",
          },
        }),
        menu: (base) => ({
          ...base,
          borderRadius: "10px",
          marginTop: "4px",
          padding: "4px 0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }),
        menuList: (base) => ({
          ...base,
          paddingRight: "4px",
          maxHeight: "200px",
        }),
      }}
    />
  );
}
