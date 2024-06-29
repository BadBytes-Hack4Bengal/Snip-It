import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { duotoneLight } from "@uiw/codemirror-theme-duotone";
import { forwardRef, MouseEventHandler, useCallback, useContext, useState } from "react";
import ThemeContext, { Theme } from "@src/contexts/ThemeContext";
import { langs } from "@uiw/codemirror-extensions-langs";
import { ISnippet } from "@src/utils/data";
import { Avatar, Button } from "react-daisyui";
import { ArrowBigDown, ArrowBigUp, BookmarkPlus, Clipboard, ClipboardCheck, Download } from "lucide-react";
import SnippetTag from "@src/components/SnippetTag";
import { truncate } from "lodash";
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

const DownloadButton = () => {
  return (
    <a href="#" className="grow">
      <Button className="w-full" size="sm">
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

const UpvoteButton = () => {
  return (
    <Button size="xs" className="flex gap-2 rounded-r-none">
      <ArrowBigUp size={20} />
    </Button>
  );
};

const DownvoteButton = () => {
  return (
    <Button size="xs" className="flex gap-2 rounded-l-none">
      <ArrowBigDown size={20} />
    </Button>
  );
};

const SaveButton = () => {
  return (
    <Button size="xs" className="flex gap-1 items-center">
      <BookmarkPlus size={14} /> Save
    </Button>
  );
};

const SnippetBody = ({ snippetData }: ISnippetProps) => {
  const { title, description, tags, author } = snippetData;
  const copySnippet = useCallback(async () => {
    await navigator.clipboard.writeText(snippetData.code);
  }, [snippetData.code]);
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="text-sm flex items-center gap-2">
          <Avatar
            shape="circle"
            size={18}
            src="https://i.pinimg.com/736x/58/7b/57/587b57f888b1cdcc0e895cbdcfde1c1e.jpg"
          />
          {author}
        </div>
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <span className="text-sm">{truncate(description, {length: 140}) || <i>No description provided.</i>}</span>
      <div className="flex gap-2">
        <CopyButton onClick={copySnippet} />
        <DownloadButton />
      </div>
      <Tags tags={tags} />
      <div className="flex w-full justify-between">
        <div className="flex">
          <UpvoteButton />
          <DownvoteButton />
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
  upvoted?: boolean;
}

const Snippet = forwardRef<HTMLDivElement, ISnippetProps>(({ snippetData, upvoted = false }, ref) => {
  return (
    <div ref={ref} className="w-72 border border-base-content/10 rounded-xl">
      <SnippetHead snippetData={snippetData} />
      <SnippetBody snippetData={snippetData} />
    </div>
  );
});

export default Snippet;
