import React from "react";
import { CharacterBasicInfoFragment } from "../../../generated/graphql";
import CharacterCard from "./CharacterCard";

interface ListCharactersProps {
  characters: (CharacterBasicInfoFragment | null)[] | null | undefined;
}

const ListCharacters: React.FC<ListCharactersProps> = ({ characters }) => {
  return (
    <div>
      {(characters || []).map((character) => (
        <CharacterCard key={character?.id} character={character} />
      ))}
    </div>
  );
};

export default ListCharacters;
