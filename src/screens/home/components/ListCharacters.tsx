import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

import { CharacterBasicInfoFragment } from "../../../generated/graphql";
import CharacterCard from "./CharacterCard";
import { useBoundStore } from "../../../lib/zustand/store";

interface ListCharactersProps {
  characters: (CharacterBasicInfoFragment | null)[] | null | undefined;
}

const ListCharacters: React.FC<ListCharactersProps> = ({ characters }) => {
  const openedCharacters = useBoundStore((state) => state.opened);
  const collapseAllCharacters = useBoundStore((state) => state.collapse);

  return (
    <Stack>
      <Button
        variant="contained"
        disabled={!openedCharacters.length}
        onClick={collapseAllCharacters}
        startIcon={<DoNotDisturbOnIcon />}
      >
        COLLAPSE
      </Button>
      {(characters || []).map((character) => (
        <CharacterCard key={character?.id} character={character} />
      ))}
    </Stack>
  );
};

export default ListCharacters;
