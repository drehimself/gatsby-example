import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>

    <h2>Manual Blogroll</h2>

    <ul>
      <li><Link to="/blog-html/blog-post-one">Blog Post One</Link></li>
      <li><Link to="/blog-html/blog-post-two">Blog Post Two</Link></li>
      <li><Link to="/blog-html/blog-post-three">Blog Post Three</Link></li>
    </ul>

    <h2>Automatic Blogroll</h2>

    <ul>
      {data.allMarkdownRemark.edges.map(post => (
        <li key={post.node.id}>
          <Link to={post.node.frontmatter.path}>{post.node.frontmatter.title}</Link>
        </li>
      ))}
    </ul>

    <h2>Reddit /r/aww posts</h2>

    <ul>
      {data.allRedditPost.edges.map(post => (
        <li key={post.node.id}>
          <Link to={post.node.path}>{post.node.title}</Link>
        </li>
      ))}
    </ul>

    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export const pageQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            path
            title
          }
        }
      }
    }
    allRedditPost {
      edges {
        node {
          id
          path
          title
          img
          thumbnail
        }
      }
    }
  }

`

export default IndexPage
