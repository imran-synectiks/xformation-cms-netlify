import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import Carousel from 'nuka-carousel';
import { AiOutlineLeft, AiOutlineRight, AiOutlineArrowDown } from 'react-icons/ai';
import { BsArrowDown } from 'react-icons/bs';
import { v4 } from 'uuid';
import './service.css';
import ScrollTop from '../components/ScrollTop';
import ScrollBottom from '../components/ScrollBottom';
import servicesublist from '../pages/servicemenu/servicesublist.js';

export const ServiceListPostTemplate = ({ content, contentComponent, description, tags, title, page, helmet }) => {
	const PostContent = contentComponent || Content;
	// const [ currentSlide, setCurrentSlide ] = useState(0);

	return (
		<React.Fragment>
			<section className='section' id='top'>
				{helmet || ''}
				<div className='container content'>
					<div className='columns'>
						<div className='column is-12'>
							<div className='btn-stack'>
								{page.map((pageContent) => <button key={v4()}>{pageContent.heading}</button>)}
							</div>
							<PostContent content={content} />
							{tags && tags.length ? (
								<div style={{ marginTop: `4rem` }}>
									<h4>Tags</h4>
									<ul className='taglist'>
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
		</React.Fragment>
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
			description: PropTypes.string
		})
	)
};

const ServiceListPost = ({ data }) => {
	const { markdownRemark: post } = data;

	return (
		<Layout>
			<ServiceListPostTemplate
				content={post.html}
				contentComponent={HTMLContent}
				description={post.frontmatter.description}
				testimonials={post.frontmatter.testimonials}
				page={post.frontmatter.page}
				helmet={
					<Helmet titleTemplate='%s | Service'>
						<title>{`${post.frontmatter.title}`}</title>
						<meta name='description' content={`${post.frontmatter.description}`} />
					</Helmet>
				}
				tags={post.frontmatter.tags}
				title={post.frontmatter.title}
			/>
		</Layout>
	);
};

ServiceListPost.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.object
	})
};

export default ServiceListPost;

export const pageQuery = graphql`
	query ServiceListPostByID($id: String!) {
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
