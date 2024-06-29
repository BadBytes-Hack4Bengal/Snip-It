import { createContext, Dispatch, SetStateAction } from "react";

interface ISearchInfo {
  title: string;
  tags: string[];
}

const SearchContext = createContext<[ISearchInfo, Dispatch<SetStateAction<ISearchInfo>>]>([
  { title: "", tags: [] },
  () => {
    console.error("Search context uninitialized!");
  }
]);

export { type ISearchInfo };
export default SearchContext;
