import React from 'react'
import { Link, graphql } from 'gatsby'
import LayoutBlog from '../components/layout-blog'
import SEO from "../components/seo"

export default function Template({ data }) {
  const post = data.redditPost

  return (
    <LayoutBlog>
      <SEO title={post.title} />
      <h1>{post.title}</h1>
      <div>
        <img src={post.img} alt="reddit"/>
      </div>
      <Link to="/">Go back to the homepage</Link>
    </LayoutBlog>
  )
}

export const postQuery = graphql`
  query RedditPostByPath($path: String!) {
    redditPost(path: { eq: $path } ) {
      id
      title
      img
    }
  }
`
