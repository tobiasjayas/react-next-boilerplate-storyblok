import Head from 'next/head'
import styles from '../styles/Home.module.css'

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from '@storyblok/react'

export default function Home({ story }) {
  console.log(story);
  story = useStoryblokState(story)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>{story ? story.name : 'My Site'}</h1>
      </header>

      <StoryblokComponent blok={story.content} />
    </div>
  )
}

export async function getStaticProps() {
  let slug = 'blog/title-blog-1'

  let sbParams = {
    version: 'published', // or 'published'
  }

  const storyblokApi = getStoryblokApi()
  let { data } = await storyblokApi.get(`cdn/stories?starts_with=home`, sbParams)

  return {
    props: {
      data
      // story: data ? data.story : false,
      // key: data ? data.story.id : false,
    },
    revalidate: 3600,
  }
}
