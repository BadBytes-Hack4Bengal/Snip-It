import { createContext, Dispatch, SetStateAction } from "react";

enum VoteStatus {
  None,
  Upvoted,
  Downvoted
}

interface ISnippetActions {
  voteStatus: VoteStatus,
  saved: boolean
}

const SnippetContext = createContext<[ISnippetActions, Dispatch<SetStateAction<ISnippetActions>>]>([
  { voteStatus: VoteStatus.None, saved: false },
  () => {
    console.error("Snippet context uninitialized!");
  }
]);

export { type ISnippetActions, VoteStatus };
export default SnippetContext;
