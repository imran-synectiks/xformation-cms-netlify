import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Testimonials from '../components/Testimonials'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const ServicePostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  testimonials,
  page1,
  page2,
  page3,
  page4,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <Testimonials testimonials={testimonials} />
            <div>
              {page1.heading}
              <br/> 
              {page1.description}
              <br/>
              <div className="tile">
                    <div className="tile is-parent is-vertical">
                      <article className="tile is-child">
                        <PreviewCompatibleImage imageInfo={page1.image} />
                      </article>
                    </div>
                    </div>
            </div>
            <div>
              {page2.heading}
              <br/> 
              {page2.description}
              <br/>
             
            </div>
            <div>
              {page3.heading}
              <br/> 
              {page3.description}
              <br/>
              
            </div>
            <div>
              {page4.heading}
              <br/> 
              {page4.description}
              <br/>
               
            </div>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

ServicePostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  page1: PropTypes.string,
  testimonials: PropTypes.array,
  title: PropTypes.string,
  helmet: PropTypes.object,
  page1: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  page2: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
  }),
  page3: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
  }),
  page4: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string, 
  }),
}

const ServicePost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ServicePostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        testimonials={post.frontmatter.testimonials}
        page1={post.frontmatter.page1}
        page2={post.frontmatter.page2}
        page3={post.frontmatter.page3}
        page4={post.frontmatter.page4}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

ServicePost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ServicePost

export const pageQuery = graphql`
  query ServicePostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        testimonials {
          author
          quote
        }
        page1 {
          description
          heading
          image {
            childImageSharp {
              fluid(maxWidth: 240, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        page2 {
          description
          heading
          
        }
        page3 {
          description
          heading
          
        }
        page4 {
          description
          heading
          
        }
      }
    }
  }
`
