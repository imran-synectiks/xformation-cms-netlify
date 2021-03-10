import React, { useState } from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import Carousel from 'nuka-carousel';
import { AiOutlineLeft, AiOutlineRight,AiOutlineArrowDown } from "react-icons/ai";
import { BsArrowDown } from "react-icons/bs";
import { v4 } from 'uuid';
import './service.css'
import ScrollTop from '../components/ScrollTop'
import ScrollBottom from '../components/ScrollBottom'

export const ServicePostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  page,
  helmet,
}) => {
  const PostContent = contentComponent || Content;
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <>
      <section className="section" id='top'>
        {helmet || ""}
        <div className="container content">
          <div className="columns">
            <div className="column is-12">
              {/* <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {title}
              </h1>
              <p>{description}</p> */}
              <div className='btn-stack'>
                {page.map((pageContent, index) => (
                  <button key={v4()} className={`${currentSlide === index ? 'mybtnactive' : 'mybtn'}`} onClick={() => setCurrentSlide(index)}>
                  <span className='btn-arr-down'>
                    <BsArrowDown/>
                  </span>
                    {pageContent.heading}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: '20px' }}>
                <Carousel
                  afterSlide={slideIndex => setCurrentSlide(slideIndex)}
                  slideIndex={currentSlide}
                  rendertopCenterControls={true}
                  renderCenterLeftControls={({ previousSlide }) => (
                    <button onClick={previousSlide}
                      className='nabtn-left'>
                      <AiOutlineLeft />
                    </button>
                  )}
                  renderCenterRightControls={({ nextSlide }) => (
                    <button onClick={nextSlide}
                      className='nabtn-right'>
                      <AiOutlineRight />
                    </button>
                  )}
                >
                  {page.map((pageContent) => (
                    <div key={v4()}>
                      <div className='page-heading'>
                        <h3 className="has-text-centered has-text-weight-semibold is-size-2">{pageContent.heading}</h3>
                      </div>
                      <div className='page-content'>
                        <p>{pageContent.description}</p>
                      </div>
                    </div>
                  ))}
                </Carousel>
                <ScrollBottom showBelow={100} />
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
      <ScrollTop showAbove={50} />
    </>
  );
};

ServicePostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  testimonials: PropTypes.array,
  title: PropTypes.string,
  helmet: PropTypes.object,
  page: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      description: PropTypes.string,
    })
  ),
};

const ServicePost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <ServicePostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        testimonials={post.frontmatter.testimonials}
        page={post.frontmatter.page}
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
  );
};

ServicePost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default ServicePost;

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
        page {
          description
          heading
        }
      }
    }
  }
`;
