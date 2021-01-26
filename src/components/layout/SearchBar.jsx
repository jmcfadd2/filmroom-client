import algoliasearch from 'algoliasearch/lite';
import { Hits, InstantSearch, Panel, SearchBox } from 'react-instantsearch-dom';
import React from 'react';
import SearchHits from './SearchHits';

const algoliaClient = algoliasearch(
  'VGTYRP0LET',
  '69131ac6a9d77e0d11b244389f93bfed'
);

const searchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return algoliaClient.search(requests);
  },
};

const SearchBar = () => {
  
  return (
    <InstantSearch
      indexName="dev_users"
      searchClient={searchClient}
    >
     
      <SearchBox 
        loadingIndicator
        searchAsYouType={true}
        
      />
      
      <Hits hitComponent={SearchHits}/>
      
    </InstantSearch>
  );
}

export default SearchBar;
