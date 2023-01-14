import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import { CharacterBasicInfoFragment } from "../../../generated/graphql";
import CharacterDetails from "./CharacterDetails";
import { useBoundStore } from "../../../lib/zustand/store";

interface CharacterCardProps {
  character: CharacterBasicInfoFragment | null | undefined;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const opened = useBoundStore((state) => state.opened);
  const openCharacter = useBoundStore((state) => state.open);
  const closeCharacter = useBoundStore((state) => state.close);

  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    if (!character?.id) return;
    isExpanded ? openCharacter(character.id) : closeCharacter(character.id);
  };

  if (!character) {
    return null;
  }

  return (
    <Accordion
      expanded={opened.includes(character.id!)}
      onChange={handleChange}
      TransitionProps={{ unmountOnExit: true }}
      sx={{ width: 650 }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" spacing={2}>
          <Avatar
            alt={character.name || ""}
            src={character.image || ""}
            sx={{ width: 56, height: 56 }}
          />

          <Stack>
            <Typography variant="h6" textAlign="left">
              {character.name}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography variant="subtitle2" color="GrayText">
                {character.species}
              </Typography>
              <Typography variant="subtitle2" color="GrayText">
                {character.gender}
              </Typography>
              <Typography variant="subtitle2" color="GrayText">
                {character.status}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <CharacterDetails character={character} />
      </AccordionDetails>
    </Accordion>
  );
};

export default CharacterCard;
