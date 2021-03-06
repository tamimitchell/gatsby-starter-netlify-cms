import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

const TagsPage = ({
  data: { allMarkdownRemark: { group }, site: { siteMetadata: { title } } },
}) => (
  <section id="main" class="wrapper style1">
    <Helmet title={`Tags | ${title}`} />
    <div className="inner">
      <header className="major special">
        <h1>Tags</h1>
      </header>
      <div className="content">
        <p className="taglist">
          {group.map(tag => (
            <span key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
              &nbsp;
              &nbsp;
            </span>
          ))}
        </p>
      </div>
    </div>
  </section>
)

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
