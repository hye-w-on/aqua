import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

const fetchPosts = async (conponentNo: string) => {
  console.log('fetchPosts: Component', conponentNo);
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
  return data;
};

const fetchTodos = async (conponentNo: string) => {
  console.log('fetchTodos: Component', conponentNo);
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
  return data;
};

/* Case1. react-query를 사용할 때는 중복호출이 제거된다 (useEffect와 비교) */
export const ReactQuerySampleComponent = (props: { conponentNo: string }) => {
  console.log('loaded: Component', props.conponentNo);

  /*
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log('useEffect: Component', props.conponentNo);

    const fetchPosts = async (conponentNo: string) => {
      console.log('fetchPosts: Component', conponentNo);
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
      setPosts(data);
    };

    fetchPosts(props.conponentNo);
  }, []);
  */

  const { data: posts } = useQuery(
    ['post'],
    () => {
      console.log('useQuery: Component', props.conponentNo);
      return fetchPosts(props.conponentNo);
    },
    { staleTime: 0 }
  );

  return <>{posts && posts.map((post: any) => <div key={post.id}>{post.title}</div>)}</>;
};

export const ReactQuerySampleComponent2 = (props: { conponentNo: string }) => {
  console.log('loaded: Component', props.conponentNo);

  const { data: posts } = useQuery(['post'], () => {
    console.log('useQuery: Component', props.conponentNo);
    return fetchTodos(props.conponentNo);
  });

  return <>{posts && posts.map((post: any) => <div key={post.id}>{post.title}</div>)}</>;
};

export default ReactQuerySampleComponent;
