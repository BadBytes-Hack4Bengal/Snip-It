import { Button } from "react-daisyui";
import Typewriter from "typewriter-effect";
import { Search, ChevronDown } from "lucide-react";
import { MouseEventHandler, ReactElement, useCallback, useRef } from "react";

const LogoSearchBar = () => {
  return (
    <div className="flex grow flex-col pb-8 justify-center gap-16">
      <div className="text-center font-landing-heading text-9xl flex justify-center items-center">
        <Typewriter
          onInit={typewriter => {
            typewriter.typeString("SNIP-IT!").stop().start();
          }}
        />
      </div>
      <div className="flex justify-center px-4">
        <label className="md:w-[45rem] w-full input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search..." />
          <Search size={16} className="text-neutral-content" />
        </label>
      </div>
    </div>
  );
};

interface IScrollDownButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const ScrollDownButton = ({ onClick }: IScrollDownButtonProps) => {
  return (
    <div className="flex basis-16 justify-center">
      <Button onClick={onClick} size="sm" shape="circle" className="animate-bounce">
        <ChevronDown size={16} />
      </Button>
    </div>
  );
};

interface IFeatureProps {
  heading: string;
  description: string;
  children?: ReactElement;
}

const Feature = ({ heading, description, children }: IFeatureProps) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <div className="text-xl font-medium">{heading}</div>
      <div>{description}</div>
      <div>{children}</div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="m-4 flex flex-col gap-6">
      <Feature heading="Filter snippets by tags" description="In a unique approach, we combine the strengths of "></Feature>
      <Feature heading="Save and organize into lists" description="Feature description goes here..."></Feature>
      <Feature heading="Upvote for Greater Visibility" description="Feature description goes here..."></Feature>
      <Feature
        heading="Get Recommendations Based on Interaction"
        description="Feature description goes here..."
      ></Feature>
      <Feature heading="Get Direct URLs to Raw Files" description="Feature description goes here..."></Feature>
    </div>
  );
};

const LandingPage = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const onScrollButtonClick = useCallback(
    () => containerRef.current?.scroll({ top: featuresRef.current?.scrollHeight, behavior: "smooth" }),
    []
  );
  return (
    <div ref={containerRef} className="overflow-scroll flex flex-col grow">
      <div className="flex min-h-full flex-col justify-center">
        <LogoSearchBar />
        <ScrollDownButton onClick={onScrollButtonClick} />
      </div>
      <div ref={featuresRef} className="flex min-h-full flex-col justify-center">
        <Features />
      </div>
    </div>
  );
};

export default LandingPage;
