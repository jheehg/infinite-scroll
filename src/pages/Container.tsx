import { useEffect, useState } from 'react';
import Box from '../components/Box';
import Status from '../components/Status';
import { gql, useQuery } from '@apollo/client';

interface CatProps {
  id: string;
  url: string;
  width: number;
  height: number;
}

const GET_IMAGES = gql`
  query getImages($limit: Int, $page: Int) {
    images(limit: $limit, page: $page) {
      id
      height
      width
      url
    }
  }
`;

const Container = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data, fetchMore } = useQuery(GET_IMAGES, {
    variables: {
      limit: 10,
      page: 1,
    },
  });

  useEffect(() => {
    window.addEventListener('scroll', loadMoreImages);
    return () => window.removeEventListener('scroll', loadMoreImages);
  }, [currentPage]);

  const isAtTheBottom = () => {
    const { scrollHeight, scrollTop } = document.documentElement;
    const innerHeight = window.innerHeight;
    return scrollHeight - scrollTop <= innerHeight;
  };

  const loadMoreImages = () => {
    if (isAtTheBottom()) {
      const nextPage = currentPage + 1;
      fetchMore({
        variables: {
          limit: 10,
          page: nextPage,
        },
      }).then(({ data }) => {
        if (data?.images?.length === 0) {
          setIsLoadingMore(false);
        } else {
          setCurrentPage(nextPage);
        }
      });
    }
  };

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div>
      {data?.images?.map((cat: CatProps) => (
        <Box key={cat.id} catInfo={cat} />
      ))}
      <Status hasMore={isLoadingMore} />
    </div>
  );
};

export default Container;

// updateQuery: (previousResult, { fetchMoreResult }) => {
//   if (!fetchMoreResult || fetchMoreResult.images.length === 0) {
//     setIsLoadingMore(false);
//     return previousResult;
//   }
//   setCurrentPage(nextPage);
//   return Object.assign({}, previousResult, {
//     images: [
//       ...previousResult.images,
//       ...fetchMoreResult.images,
//     ],
//   });
// },
