import React, { useCallback, useEffect } from "react";
import {
  CharacterDetailedInfoFragment,
  useCharactersLazyQuery,
} from "../../generated/graphql";
import { useBoundStore } from "../../lib/zustand/store";
import { useObserveElement } from "../../shared/hooks/useObserveElement";
import ListCharacters from "./components/ListCharacters";

interface HomepageProps {}

const Homepage: React.FC<HomepageProps> = ({}) => {
  const characters = useBoundStore((state) => state.characters);
  const addCharacters = useBoundStore((state) => state.addCharacters);
  const nextPage = useBoundStore((state) => state.page);
  const updateNextPage = useBoundStore((state) => state.updatePage);

  const [fetchCharacters, { called, loading, error, fetchMore }] =
    useCharactersLazyQuery({
      notifyOnNetworkStatusChange: true,
    });

  useEffect(() => {
    (async function fetch() {
      if (called) return;
      const { data: fetchedCharactersData } = await fetchCharacters({
        variables: { page: 1 },
      });
      updateNextPage(fetchedCharactersData?.characters?.info?.next);
      addCharacters(
        fetchedCharactersData?.characters
          ?.results as CharacterDetailedInfoFragment[]
      );
    })();
  }, []);

  const handleFetchMore = useCallback(async () => {
    if (!nextPage || nextPage === 1) return;
    const { data: moreCharactersData } = await fetchMore({
      variables: { page: nextPage },
    });
    updateNextPage(moreCharactersData?.characters?.info?.next);
    addCharacters(
      (moreCharactersData?.characters
        ?.results as CharacterDetailedInfoFragment[]) || []
    );
  }, [nextPage]);

  const { ref: loaderRef } = useObserveElement(handleFetchMore);

  if (!characters?.length && loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <ListCharacters characters={characters} />
      {loading && <p>Loading...</p>}
      <div ref={loaderRef} />
    </div>
  );
};

export default Homepage;
