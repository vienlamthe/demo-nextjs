import { GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';

export interface IPost {
  id: string;
  title: string;
}

interface IPostProps {
  posts: IPost[]
}

export default function Posts({ posts }: IPostProps) {
  return (
    <div>
      <ul>
        {posts.map((post: IPost) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  // server-side
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  const data = await response.json();

  return {
    props: {
      posts: data.map((post: IPost) => ({ id: post.id, title: post.title })),
    },
  };
};
