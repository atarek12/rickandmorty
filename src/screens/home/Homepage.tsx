import React, { useCallback, useEffect } from "react";
import {
  CharacterDetailedInfoFragment,
  FilterCharacter,
  useCharactersLazyQuery,
} from "../../generated/graphql";
import { useBoundStore } from "../../lib/zustand/store";
import { useObserveElement } from "../../shared/hooks/useObserveElement";
import ListCharacters from "./components/ListCharacters";
import SearchAndFilter from "./components/SearchAndFilter";

interface HomepageProps {}

const Homepage: React.FC<HomepageProps> = ({}) => {
  const characters = useBoundStore((state) => state.characters);
  const nextPage = useBoundStore((state) => state.page);
  const status = useBoundStore((state) => state.status);
  const gender = useBoundStore((state) => state.gender);
  const search = useBoundStore((state) => state.search);
  const addCharacters = useBoundStore((state) => state.addCharacters);
  const replaceCharacters = useBoundStore((state) => state.replaceCharacters);
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
      variables: { page: nextPage, filter: { gender, status, name: search } },
    });
    updateNextPage(moreCharactersData?.characters?.info?.next);
    addCharacters(
      (moreCharactersData?.characters
        ?.results as CharacterDetailedInfoFragment[]) || []
    );
  }, [nextPage, gender, status, search]);

  const handleSearchAndFilter = async (filter: FilterCharacter) => {
    const { data: filteredCharactersData } = await fetchCharacters({
      variables: { filter, page: 1 },
    });
    updateNextPage(filteredCharactersData?.characters?.info?.next);
    replaceCharacters(
      (filteredCharactersData?.characters
        ?.results as CharacterDetailedInfoFragment[]) || []
    );
  };

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
      <SearchAndFilter handleSearchAndFilter={handleSearchAndFilter} />
      <ListCharacters characters={characters} />
      {loading && <p>Loading...</p>}
      {!loading && !characters?.length && <p>No results!</p>}
      <div ref={loaderRef} />
    </div>
  );
};

export default Homepage;
