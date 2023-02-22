import Head from 'next/head'
import styles from '../styles/Home.module.css'

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from '@storyblok/react'

export default function Home({ story }) {
  story = useStoryblokState(story)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1 >{story ? story.name : 'My Site'}</h1>
      </header>
      <h2>{story.content.body[0].headline}</h2>
      <ul>
        {story.content.body[1].columns && story.content.body[1].columns.map((feat, index) => (
          <li key={index}>{feat.name}</li>
        ))}
      </ul>
      <div className={styles.flex}>
        <img alt="" src={story.content.image.filename} />
        <video width="400" controls>
          <source src={story.content.video.filename} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  let slug = 'home'

  let sbParams = {
    version: 'draft', // or 'published'
  }

  const storyblokApi = getStoryblokApi()
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams)

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    }
  }
}
