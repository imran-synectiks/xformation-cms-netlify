import React,{useState} from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { Helmet } from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Testimonials from "../components/Testimonials";
import Content, { HTMLContent } from "../components/Content";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Carousel from 'nuka-carousel';
import { AiOutlineLeft,AiOutlineRight,AiFillDownCircle,AiFillUpCircle } from "react-icons/ai";
import { css, cx } from '@emotion/css'

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
  const PostContent = contentComponent || Content;

const [state, setState] = useState({
  ...state,
  slideIndex: 0
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
            <div className={
              css`
              display: flex;
              justify-content: space-around;
              background-color: Black;
              padding: 1rem;
              }
              `
            }>
            <button className="mybtn" onClick={() => setState({ slideIndex: 0 })}>{page1.heading} {state.currentSlide}</button>
            <button className="mybtn" onClick={() =>  setState({ slideIndex: 1 })}>{page2.heading}</button>
             <button className="mybtn" onClick={() => setState({ slideIndex: 2 })}>{page3.heading}</button>
            <button className="mybtn" onClick={() => setState({ slideIndex: 3 })}>{page4.heading}</button>
          </div>
            <div style={{marginTop: '20px'}}>
              <Carousel
              slideIndex={state.slideIndex}
              renderBottomCenterControls={false}
              //  renderBottomCenterControls={({nextSlide}) =>(
              //    <button onClick={nextSlide}>{ title }</button>
              //  )}
               renderCenterLeftControls={({ previousSlide }) => (
    <button onClick={previousSlide}
    className={css`
    padding: 15px 30px;
    background: transparent;
    color: rgba(230, 126, 34, 1);
    font-size: 45px;
    border: none;
    position: absolute;
    bottom: 11rem;
    left: -1rem;
    &:hover {
      color: rgba(0, 0, 0, .8);
      cursor: pointer;
    }
    &:focus {
      border: none;
    }
  `}>
      <AiOutlineLeft />
    </button>
  )}
  renderCenterRightControls={({ nextSlide }) => (
    <button onClick={nextSlide}
    className={css`
    padding: 15px 30px;
    background: transparent;
    color: rgba(230, 126, 34, 1);
    font-size: 45px;
    border: none;
    position: absolute;
    bottom: 11rem;
    right: -1rem;
    &:hover {
      color: rgba(0, 0, 0, .8);
      cursor: pointer;
    }
    &:focus {
      border: none;
    }
  `}>
      <AiOutlineRight/>
    </button>
  )}
>
            <div>
              <div className={
              css`
                padding: 16rem 5.1rem;
                cursor: text;
                background: #aee1e1;
                color: #456268;
              `
            }>
              <h3>{page1.heading}</h3>
              </div>
              <div className={css`
                display: flex;
                justify-content: center;
              `}>
              <a href='#page1' className={css`
                   position: relative;
                  top: 0rem;
                  margin: 2rem;
              `}><AiFillDownCircle className={css`
                font-size: 2rem;
              `}/></a>
              </div>
              <div id='page1'>
              <p>{page1.description}</p>
              </div>

            </div>
            <div>
              <div  className={
              css`
                padding: 16rem 5.1rem;
                cursor: text;
                background:#fdffbc;
                color: #456268;
              `
            }>
              <h3>{page2.heading}</h3>
              </div>
              <div className={css`
                display: flex;
                justify-content: center;
              `}>
               <a href='#page2' className={css`
                  position: relative;
                  top: 0rem;
                  margin: 2rem;
              `}><AiFillDownCircle className={css`
                font-size: 2rem;
              `}/></a>
              </div>
              <div id='page2'>
              <p>{page2.description}</p>
              </div>
            </div>
            <div>
              <div className={
              css`
                padding: 16rem 5.1rem;
                cursor: text;
                background: #d4e2d4;
                color: #456268;
              `
            }>
              <h3>{page3.heading}</h3>
              </div>
              <div className={css`
                display: flex;
                justify-content: center;
              `}>
              <a href='#page3' className={css`
                  position: relative;
                  top: 0rem;
                  margin: 2rem;
              `}><AiFillDownCircle className={css`
                font-size: 2rem;
              `}/></a>
              </div>
              <div id='page3'>
              <p>{page3.description}</p>
              </div>
            </div>
            <div>
              <div className={
              css`
                padding: 16rem 5.1rem;
                cursor: text;
                background: #c6ebc9;
                color: #456268;
              `
            }>
              <h3>{page4.heading}</h3>
              </div>
              <div className={css`
                display: flex;
                justify-content: center;
              `}>
                <a href='#page4' className={css`
                  position: relative;
                  top: 0rem;
                  margin: 2rem;
              `}><AiFillDownCircle className={css`
                font-size: 2rem;
              `}/></a>
              </div>
             <div id='page4'>
              <p>{page4.description}</p>
              </div>
            </div>
            </Carousel>
           
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
