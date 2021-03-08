import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Testimonials from "../components/Testimonials";
import Content, { HTMLContent } from "../components/Content";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Carousel from 'nuka-carousel';
import { AiOutlineLeft, AiOutlineRight, AiFillDownCircle, AiFillUpCircle } from "react-icons/ai";
import { css, cx } from '@emotion/css'
import styled from '@emotion/styled'
import './service.css'
import ScrollTop from '../components/ScrollTop'
import ScrollBottom from '../components/ScrollBottom'

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
  primaryRef,
  secondaryRef,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  const [state, setState] = useState({
    // ...state,
    slideIndex: 0,
    currentSlide: undefined,

    primaryRef: React.useRef(),
    secondaryRef: React.useRef()
  });

  return (
    <>

      <section className="section" id='top'>
        {helmet || ""}
        <div className="container-fluid content">
          <div className="columns">
            <div className=""
            >
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {title}
              </h1>
              <p>{description}</p>
              {/* <Testimonials testimonials={testimonials} />  */}
              <div className='btn-stack'>
                <button className={`${state.slideIndex === 0 ? 'mybtnactive' : 'mybtn'}`} onClick={() => setState({ slideIndex: 0 })}>{page1.heading}</button>
                <button className={`${state.slideIndex === 1 ? 'mybtnactive' : 'mybtn'}`} onClick={() => setState({ slideIndex: 1 })}>{page2.heading}</button>
                <button className={`${state.slideIndex === 2 ? 'mybtnactive' : 'mybtn'}`} onClick={() => setState({ slideIndex: 2 })}>{page3.heading}</button>
                <button className={`${state.slideIndex === 3 ? 'mybtnactive' : 'mybtn'}`} onClick={() => setState({ slideIndex: 3 })}>{page4.heading}</button>

              </div>

              <div style={{ marginTop: '20px' }}>
                <Carousel

                  slideIndex={state.slideIndex}
                  currentSlide={state.currentSlide}
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
                  renderTopCenterControls={({ currentSlide }) => (
                    <div>Slide: {currentSlide + 1}</div>
                  )}
                >
                  <div>
                    <div className='page-heading'>
                      <h3>{page1.heading}</h3>
                    </div>
                    <div>
                      <p>{page1.description}</p>
                    </div>
                  </div>

                  <div>
                    <div className='page-heading'>
                      <h3>{page2.heading}</h3>
                    </div>
                    <div>
                      {page2.description}
                    </div>
                  </div>

                  <div>
                    <div className='page-heading'>
                      <h3>{page3.heading}</h3>
                    </div>
                    <div>
                      {page3.description}
                    </div>
                  </div>

                  <div>
                    <div className='page-heading'>
                      <h3>{page4.heading}</h3>
                    </div>
                    <div>
                      {page4.description}
                    </div>
                  </div>
                </Carousel>

                <ScrollBottom showBelow={200} />
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

      {/* <div className={css`
      display: flex;
      justify-content: center;
    `}>
      <a href="#top" ><AiFillUpCircle className={css`
        font-size: 2rem;
      `}/></a>
    </div> */}
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
  slideIndex: PropTypes.number,
  page1: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
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
        page1 {
          description
          heading
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
`;
