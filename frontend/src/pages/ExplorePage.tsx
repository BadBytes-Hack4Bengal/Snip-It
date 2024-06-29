import { useCallback, useMemo, useRef } from "react";
import { fetchSnippets, ISnippet } from "@src/utils/data";
import { Loading } from "react-daisyui";
import { useInfiniteQuery } from "@tanstack/react-query";
import Overlay from "@src/components/Overlay";
import Snippet from "@src/components/Snippet";

const ExplorePage = () => {
  const observer = useRef<IntersectionObserver>();

  const loadData = async ({ pageParam }) => {
    const snippets = await fetchSnippets();
    return snippets;
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useInfiniteQuery<ISnippet[]>({
    queryKey: ["snippets"],
    queryFn: ({ pageParam }) => loadData({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    }
  });

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  const snippets = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  return (
    <div className="flex justify-center overflow-scroll p-8">
      {isLoading ? (
        <Overlay>
          <Loading variant="ring" size="lg" />
        </Overlay>
      ) : (
        <div>
          <div className="grid m-auto xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {snippets?.map((snippet, idx) => <Snippet ref={lastElementRef} key={idx} snippetData={snippet} />)}
          </div>
          {isFetching && (
            <div className="flex justify-center text-4xl my-6 transition-all">
              <Loading variant="dots" size="lg" className="text-base-content/50" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
