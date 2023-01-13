import React from "react";
import { useCharactersQuery } from "../../generated/graphql";

interface HomepageProps {}

const Homepage: React.FC<HomepageProps> = ({}) => {
  const { data, loading, error } = useCharactersQuery();

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  return <h1>Homepage</h1>;
};

export default Homepage;
