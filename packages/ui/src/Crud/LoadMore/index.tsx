import React, { useEffect, useRef, memo } from "react";

type LoadMoreProps = {
  onLoadMore: () => void; // Function to trigger loading more data
};

const LoadMore: React.FC<LoadMoreProps> = memo(({ onLoadMore }) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore(); // Trigger the load more function when the element is visible
        }
      },
      {
        rootMargin: "0px",
        threshold: 1.0, // 100% of the element must be visible
      },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    // Clean up observer on unmount
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [onLoadMore]);

  return (
    <div
      ref={loadMoreRef}
      style={{ textAlign: "center", padding: "20px", cursor: "pointer" }}
    >
      <button>Load More</button>
    </div>
  );
});

export default LoadMore;
