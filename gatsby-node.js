/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")
const axios = require('axios');
const crypto = require('crypto');

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  // fetch raw data from the randomuser api
  const fetchRedditPosts = () => axios.get(`https://www.reddit.com/r/aww.json?raw_json=1`);
  // await for results
  const res = await fetchRedditPosts();

  // map into these results and create nodes
  res.data.data.children.map((post, i) => {
    // Create your node object
    const postNode = {
      // Required fields
      id: `${post.data.id}`,
      parent: `__SOURCE__`,
      internal: {
        type: `RedditPost`, // name of the graphQL query --> allRandomUser {}
        // contentDigest will be added just after
        // but it is required
      },
      children: [],

      // Other fields that you want to query with graphQl
      title: post.data.title,
      path: `/reddit/${post.data.id}`,
      thumbnail: post.data.thumbnail,
      img: post.data.preview.images[0].source.url

      // etc...
    }

    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(postNode))
      .digest(`hex`);
    // add it to postNode
    postNode.internal.contentDigest = contentDigest;

    // Create node with the gatsby createNode() API
    createNode(postNode);
  });

  return;
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  const redditTemplate = path.resolve(`src/templates/reddit-post.js`)

  return graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            html
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
            thumbnail
            img
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {}, // additional data can be passed via context
      })
    })

    result.data.allRedditPost.edges.forEach(({ node }) => {
      createPage({
        path: node.path,
        component: redditTemplate,
        context: {}, // additional data can be passed via context
      })
    })
  })
}
