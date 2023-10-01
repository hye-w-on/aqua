import { useState } from 'react';
import { BbsPost } from '../models/Bbs';
import { useQuery } from 'react-query';
import { getBbsPosts } from '../rest-api/bbs';

const Notice = () => {
  const [postList, setPostList] = useState<BbsPost[]>([]);

  const fetchBbsPosts = async () => {
    //const response = await getBbsPosts();
    //return response.data;
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0');
    return response.json();
  };

  const { data, isError, isLoading } = useQuery('posts', fetchBbsPosts);

  return (
    <>
      {data?.map((post: any) => {
        return <div key={post.postNo}>{post.title}</div>;
      })}
    </>
  );
};

export default Notice;
