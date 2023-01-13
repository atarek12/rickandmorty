import React from "react";
import { useCharactersQuery } from "../../generated/graphql";
import ListCharacters from "./components/ListCharacters";

interface HomepageProps {}

const Homepage: React.FC<HomepageProps> = ({}) => {
  const { data, loading, error } = useCharactersQuery();

  if (loading) {
    return <p>loading...</p>;
  }

  if (error || !data) {
    return <p>Error!</p>;
  }

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <ListCharacters characters={data.characters?.results} />
    </div>
  );
};

export default Homepage;
