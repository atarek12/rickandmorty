import React from "react";
import debounce from "lodash.debounce";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { SelectChangeEvent } from "@mui/material/Select";

import Select from "../../../shared/components/Select";
import { useBoundStore } from "../../../lib/zustand/store";
import { FilterCharacter } from "../../../generated/graphql";

const StatusOptions = ["All", "Alive", "Dead", "unknown"];
const GenderOptions = ["All", "Female", "Male", "Genderless", "unknown"];

type Event =
  | SelectChangeEvent<string>
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

interface SearchAndFilterProps {
  handleSearchAndFilter: (filter: FilterCharacter) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  handleSearchAndFilter,
}) => {
  const status = useBoundStore((state) => state.status);
  const updateStatus = useBoundStore((state) => state.updateStatus);
  const gender = useBoundStore((state) => state.gender);
  const updateGender = useBoundStore((state) => state.updateGender);
  const search = useBoundStore((state) => state.search);
  const updateSearch = useBoundStore((state) => state.updateSearch);

  const updater = {
    status: updateStatus,
    gender: updateGender,
    name: updateSearch,
  } as const;

  const handleChange = (event: Event, name: "status" | "gender" | "name") => {
    let value: string | undefined = event?.target?.value;
    value = value === "All" ? undefined : value;
    updater[name](value);
    debounce(() => {
      handleSearchAndFilter({ name: search, gender, status, [name]: value });
    }, 200)();
  };

  return (
    <Box sx={{ backgroundColor: "white", p: 2 }}>
      <Stack direction="row">
        <TextField
          fullWidth
          label="Search by name"
          value={search}
          onChange={(event) => {
            handleChange(event, "name");
          }}
        />
        <Select
          options={StatusOptions}
          label="Status"
          value={status}
          onChange={(event) => {
            handleChange(event, "status");
          }}
        />
        <Select
          options={GenderOptions}
          label="Gender"
          value={gender}
          onChange={(event) => {
            handleChange(event, "gender");
          }}
        />
      </Stack>
    </Box>
  );
};

export default SearchAndFilter;
