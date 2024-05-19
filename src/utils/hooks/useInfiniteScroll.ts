import { useCallback, useLayoutEffect, useRef, useState } from "react";

interface useInfiniteScrollProps<T> {
  callback: (pageValue: number, listValue: T[], searchValue?: string) => void;
  listValue: T[];
  pageValue: number;
  loading?: boolean;
  hasMore?: boolean;
  searchValue?: string;
}

const useInfiniteScroll = <T>({
  callback,
  pageValue,
  listValue,
  loading,
  hasMore,
  searchValue,
}: useInfiniteScrollProps<T>) => {
  const [distanceBottom, setDistanceBottom] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  //scroll callback listener
  const scrollListener = useCallback(async () => {
    if (!ref.current) {
      return;
    }

    let bottom = ref.current.scrollHeight - ref.current.clientHeight;

    if (!distanceBottom) {
      setDistanceBottom(Math.round(bottom * 0.2));
    }

    if (
      ref.current.scrollTop > bottom - distanceBottom &&
      hasMore &&
      !loading
    ) {
      await callback(pageValue, listValue, searchValue);
    }
  }, [loading, distanceBottom, hasMore, listValue, pageValue]);

  //set listeners for scroll
  useLayoutEffect(() => {
    const scrollableElement = ref.current;

    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", scrollListener);
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", scrollListener);
      }
    };
  }, [scrollListener, ref.current]);

  return ref;
};

export default useInfiniteScroll;
