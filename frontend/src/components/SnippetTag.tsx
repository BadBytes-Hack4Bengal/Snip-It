import ThemeContext, { Theme } from "@src/contexts/ThemeContext";
import { sample } from "lodash";
import { X } from "lucide-react";
import { useContext, useEffect, useState } from "react";

interface ISnippetTagProps {
  children: string;
  onRemove?: (tagName?: string) => void;
  removable?: boolean;
  colorless?: boolean;
}

const SnippetTag = ({ children, onRemove, removable = false, colorless = false }: ISnippetTagProps) => {
  const [tagColors, setTagColors] = useState<string[]>([]);
  const [theme] = useContext(ThemeContext);
  useEffect(() => {
    setTagColors(
      theme == Theme.Light
        ? [
            "bg-red-900",
            "bg-blue-900",
            "bg-green-900",
            "bg-yellow-900",
            "bg-violet-900",
            "bg-orange-900"
          ]
        : [
            "bg-red-100/80",
            "bg-blue-100/80",
            "bg-green-100/80",
            "bg-yellow-100/80",
            "bg-violet-100/80",
            "bg-orange-100/80"
          ]
    );
  }, [theme]);
  return (
    <span className={`rounded-full ${colorless ? "bg-base-content/50" : sample(tagColors)} flex gap-0.5 items-center px-2 text-sm text-base-100`}>
      #{children}
      {removable &&
        <span className="mt-0.5 cursor-pointer" onClick={() => onRemove?.call(children)}><X size={12} /></span>
      }
    </span>
  );
};


export default SnippetTag;
