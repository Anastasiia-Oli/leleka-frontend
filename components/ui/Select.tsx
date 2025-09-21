"use client";
import Select from "react-select";

type SelectProps = {
  options: string[];
  placeholder?: string;
  name?: string;
  id?: string;
  height?: number | string;
};

export default function CustomSelect({
  options,
  placeholder = "Select one...",
  name,
  id,
  height = 40,
}: SelectProps) {
  const formattedOptions = options.map((opt) => ({
    value: opt,
    label: opt,
  }));

  return (
    <>
      <Select
        options={formattedOptions}
        placeholder={placeholder}
        classNamePrefix="custom-select"
        name={name}
        id={id}
        styles={{
          container: (base) => ({
              ...base,
              width: "100%", // ← контейнер займає всю ширину батьківського
            }),
          control: (base, state) => ({
            ...base,
            backgroundColor: "#f2f2f2",
            borderRadius: state.menuIsOpen ? "12px 12px 0 0" : "12px",
            border: "1px solid rgba(0,0,0,0)",
            boxShadow: "none",
            padding: "2px 6px",
            cursor: "pointer",
            height: height,
            width: "100%",
            "&:hover" : { border: "1px solid rgba(0,0,0,0.15)" },
          }),
          placeholder: (base) => ({
            ...base,
            color: "#555",
          }),
          dropdownIndicator: (base, state) => ({
            ...base,
            transition: "transform 0.2s",
            transform: state.selectProps.menuIsOpen
              ? "rotate(180deg)"
              : "rotate(0deg)",
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
          menu: (base) => ({
            ...base,
            marginTop: 0,
            border: "1px solid rgba(0,0,0,0.15)",
            borderTop: "none",
            borderRadius: "0 0 12px 12px",
            backgroundColor: "#f2f2f2",
            padding: "8px 0",
            zIndex: 10,
          }),
          option: (base, state) => ({
            ...base,
            cursor: "pointer",
            borderRadius: "8px",
            padding: "8px 12px",
            backgroundColor: state.isSelected
              ? "#e6e6e6"
              : state.isFocused
              ? "rgba(0,0,0,0.05)"
              : "transparent",
            color: "#000",
            "&:active": {
              backgroundColor: "rgba(0,0,0,0.1)",
            },
          }),
        }}
      />
    </>
  );
}
