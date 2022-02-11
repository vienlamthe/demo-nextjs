import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';
import { IPost } from '.';

interface PostDetailProps {
  post: IPost;
}

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <div>
      <h3>
        Detail {post.title} - {post.id}
      </h3>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  const posts = await response.json();
  const data = posts.map((post: IPost) => ({ params: { id: String(post.id) } }));

  return {
    paths: [...data],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${params?.id}`
  );
  const post = await response.json();

  return {
    props: {
      post
    },
  };
};
