import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import { CharacterBasicInfoFragment } from "../../../generated/graphql";

interface CharacterCardProps {
  character: CharacterBasicInfoFragment | null | undefined;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  if (!character) {
    return null;
  }

  return (
    <Accordion
    // expanded={}
    // onChange={}
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
        <Typography>
          Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
          Aliquam eget maximus est, id dignissim quam.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default CharacterCard;
