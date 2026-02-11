import React, { useEffect } from "react";
import ListOfPics from "../../components/ListOfPics";
import Spinner from "../../components/Spinner";
import UsePics from "../../hooks/usePics";

export default function SearchResults({ params }) {
  const { keyword } = params;
  const { loading, loadingNextPage, pics, setPage } = UsePics({ keyword });


  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      if (nearBottom && !loadingNextPage && !loading) {
        setPage(prev => prev + 1);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadingNextPage, loading, setPage]);

  return (
    <>
      <ListOfPics pics={pics} />
      {loadingNextPage && <Spinner />}
    </>
  );
}
