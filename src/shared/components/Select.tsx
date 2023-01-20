import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import MUISelect, { SelectChangeEvent } from "@mui/material/Select";

interface SelectProps {
  options: string[];
  label: string;
  value?: string;
  onChange?: (event: SelectChangeEvent) => void;
}

const Select: React.FC<SelectProps> = ({ options, label, value, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
      <MUISelect
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        label={label}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
};

export default Select;
