import { useCallback, useEffect, useState } from 'react';
import Box from '../components/Box';
import Status from '../components/Status';

interface CatProps {
  id: string;
  url: string;
  width: number;
  height: number;
}

const Container = () => {
  const [data, setData] = useState<CatProps[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    setTimeout(() => hasMore && fetchData({ page, limit }), 800);

    window.addEventListener('scroll', setNextPage);

    return () => window.removeEventListener('scroll', setNextPage);
  }, [page]);

  const fetchData = ({ limit, page }: { limit: number; page: number }) => {
    getContents({ limit, page }).then((newData = []) => {
      if (newData?.length > 0) {
        setData([...data, ...newData]);
      } else if (newData?.length < limit) {
        setHasMore(false);
      }
    });
  };

  const isAtTheBottom = () => {
    const { scrollHeight, scrollTop } = document.documentElement;
    const innerHeight = window.innerHeight;
    return scrollHeight - scrollTop <= innerHeight;
  };

  const setNextPage = useCallback(() => {
    if (isAtTheBottom()) {
      setPage(page + 1);
    }
  }, [page]);

  const getContents = ({
    limit = 10,
    page = 1,
  }: {
    limit: number;
    page: number;
  }) => {
    return fetch(
      `https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {data.map((cat: CatProps) => (
        <Box key={cat.id} catInfo={cat} />
      ))}
      <Status hasMore={hasMore} />
    </div>
  );
};

export default Container;
