import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Banner from '../components/Home/Banner'
import TravelSection from '../components/Home/TravelSection'
import BlogSection from '../components/Home/BlogSection'
import ContactSection from '../components/Home/ContactSection'
import AboutSection from '../components/Home/AboutSection'
import Link from 'gatsby-link'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props

    const travelPosts = data.allMarkdownRemark.edges
                                .filter(post => (post.node.frontmatter.tags &&
                                                 post.node.frontmatter.tags.includes('travel')))
                                .slice(0, 4)
    const otherPosts = data.allMarkdownRemark.edges
                                .filter(post => (post.node.frontmatter.tags &&
                                                 !post.node.frontmatter.tags.includes('travel')))
                                .slice(0, 4)

    return (
      <div>
        <Helmet
          bodyAttributes={{
            class: 'landing'
          }}
        />
        <Banner content={data.homeContent.frontmatter.banner} />

        {travelPosts.length > 0 &&
          <TravelSection content={data.homeContent.frontmatter.travelSection} posts={travelPosts} />
        }

        {otherPosts.length > 0 &&
          <BlogSection content={data.homeContent.frontmatter.blogSection} posts={otherPosts} />
        }
        <ContactSection content={data.homeContent.frontmatter.contactSection} />
        <AboutSection content={data.homeContent.frontmatter.aboutSection} images={data.homeImages.edges} />
      </div>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    homeContent: markdownRemark(id: { regex: "/home/index.md/" }) {
      frontmatter {
        banner {
          title
          subtitle
          blurb
        }
        travelSection {
          title
          subtitle
          callToAction
        }
        blogSection {
          title
          subtitle
          callToAction
        }
        contactSection {
          title
          blurb
          callToAction
          thankYouMessage
        }
        aboutSection {
          title
          subtitle
          blurb
          image1 { image }
          image2 { image }
          image3 { image }
          image4 { image }
        }
      }
    }
    homeImages: allImageSharp(filter: {id: { regex: "/home/" }}) {
      edges {
        node {
          id
          sizes(maxWidth: 1240 ) {
            ...GatsbyImageSharpSizes_tracedSVG
          }
        }
      }
    }
    allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      ) {
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          fields {
            slug
          }
          frontmatter {
            title
            subtitle
            templateKey
            previewImage
            tags
          }
        }
      }
    }
  }
`
