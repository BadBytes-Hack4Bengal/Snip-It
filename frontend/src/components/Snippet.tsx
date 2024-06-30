import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { duotoneLight } from "@uiw/codemirror-theme-duotone";
import { forwardRef, MouseEventHandler, useCallback, useContext, useState } from "react";
import ThemeContext, { Theme } from "@src/contexts/ThemeContext";
import { langs } from "@uiw/codemirror-extensions-langs";
import { ISnippet } from "@src/utils/data";
import { Avatar, Button } from "react-daisyui";
import {
  ArrowBigDown,
  ArrowBigUp,
  BookmarkCheck,
  BookmarkPlus,
  Clipboard,
  ClipboardCheck,
  Download
} from "lucide-react";
import SnippetTag from "@src/components/SnippetTag";
import { truncate } from "lodash";
import SnippetContext, { ISnippetActions, VoteStatus } from "@src/contexts/SnippetContext";
interface ICopyButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const CopyButton = ({ onClick }: ICopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      onClick={async event => {
        onClick(event);
        setCopied(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCopied(false);
      }}
      className="grow"
      size="sm"
    >
      {copied ? (
        <>
          <ClipboardCheck size={14} />
          Copied
        </>
      ) : (
        <>
          <Clipboard size={14} />
          Copy
        </>
      )}
    </Button>
  );
};

const DownloadButton = ({onClick}: {onClick: MouseEventHandler}) => {
  return (
    <a href="#" className="grow">
      <Button onClick={onClick} className="w-full" size="sm">
        <Download size={14} />
        Raw
      </Button>
    </a>
  );
};

interface ITagsProps {
  tags: string[];
}

const Tags = ({ tags }: ITagsProps) => {
  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {tags.map((tagName, idx) => (
        <SnippetTag key={idx}>{tagName}</SnippetTag>
      ))}
    </div>
  );
};

const SnippetHead = ({ snippetData }: ISnippetProps) => {
  const [theme] = useContext(ThemeContext);
  const { code } = snippetData;
  return (
    <div className="bg-base-100 h-48 p-2 rounded-xl overflow-scroll">
      <CodeMirror
        readOnly={true}
        extensions={[langs.cpp()]}
        value={code}
        theme={theme == Theme.Dark ? dracula : duotoneLight}
      />
    </div>
  );
};

const UpvoteButton = ({onClick}: {onClick: MouseEventHandler}) => {
  const [{ voteStatus }] = useContext(SnippetContext);
  return (
    <Button onClick={onClick} size="xs" className={`flex gap-2 rounded-r-none ${voteStatus == VoteStatus.Upvoted && "bg-primary"}`}>
      <ArrowBigUp size={20} />
    </Button>
  );
};

const DownvoteButton = ({onClick}: {onClick: MouseEventHandler}) => {
  const [{ voteStatus }] = useContext(SnippetContext);
  return (
    <Button onClick={onClick} size="xs" className={`flex gap-2 rounded-l-none ${voteStatus == VoteStatus.Downvoted && "bg-secondary"}`}>
      <ArrowBigDown size={20} />
    </Button>
  );
};

const SaveButton = () => {
  const [snippetActions, setSnippetActions] = useContext(SnippetContext);
  const toggleSave = useCallback(() => {
    const newSavedStatus = !snippetActions.saved;
    // TODO: send `newSavedStatus` to server
    setSnippetActions({
      ...snippetActions,
      saved: newSavedStatus
    });
  }, [snippetActions, setSnippetActions]);
  return (
    <Button onClick={toggleSave} size="xs" className="flex gap-1 items-center">
      {snippetActions.saved ? (
        <>
          <BookmarkCheck size={14} /> Saved
        </>
      ) : (
        <>
          <BookmarkPlus size={14} /> Save
        </>
      )}
    </Button>
  );
};

interface ISnippetBodyProps {
  snippetData: ISnippet;
  onDownloadClick: MouseEventHandler;
}

const SnippetBody = ({ snippetData, onDownloadClick }: ISnippetBodyProps) => {
  const { title, description, tags, author, score } = snippetData;
  const [state, setState] = useContext(SnippetContext);
  const copySnippet = useCallback(async () => {
    await navigator.clipboard.writeText(snippetData.code);
  }, [snippetData.code]);
  return (
    <div className="p-4 h-[21rem] flex flex-col gap-4 justify-between grow">
      <div className="flex flex-col gap-1">
        <div className="text-sm flex items-center gap-2">
          {author.profilePicUrl ? (
            <Avatar className="placeholder" shape="circle" size={18} src={author.profilePicUrl} />
          ) : (
            <div className="avatar placeholder">
              <div className="bg-neutral w-4 text-xs text-neutral-content w-24 rounded-full">
                <span>{ author.username[0] }</span>
              </div>
            </div>
          )}
          {author.username}
        </div>
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <span className="text-sm">{truncate(description, { length: 140 }) || <i>No description provided.</i>}</span>
      <div className="flex gap-2">
        <CopyButton onClick={copySnippet} />
        <DownloadButton onClick={onDownloadClick} />
      </div>
      <Tags tags={tags} />
      <div className="flex w-full justify-between items-center">
        <div className="flex">
          <UpvoteButton onClick={() => setState(state => ({...state, voteStatus: VoteStatus.Upvoted}))} />
          <DownvoteButton onClick={() => setState(state => ({...state, voteStatus: VoteStatus.Downvoted}))} />
        </div>
        <div className="text-sm">
          {score} {score == 1 ? "vote" : "votes"}
        </div>
        <div>
          <SaveButton />
        </div>
      </div>
    </div>
  );
};

interface ISnippetProps {
  snippetData: ISnippet;
}

const Snippet = forwardRef<HTMLDivElement, ISnippetProps>(({ snippetData }, ref) => {
  const [snippetActions, setSnippetActions] = useState<ISnippetActions>({
    voteStatus: VoteStatus.None,
    saved: false
  });
  return (
    <SnippetContext.Provider value={[snippetActions, setSnippetActions]}>
      <div ref={ref} className="w-72 border border-base-content/10 rounded-xl h-fit">
        <SnippetHead snippetData={snippetData} />
        <SnippetBody snippetData={snippetData} onDownloadClick={() => {
          const a = document.createElement('a');
          a.download = `${snippetData.author.username}.${snippetData.lang}`;
          a.href = URL.createObjectURL(new Blob([snippetData.code]));
          a.click();
        }} />
      </div>
    </SnippetContext.Provider>
  );
});

export default Snippet;
