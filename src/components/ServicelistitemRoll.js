import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import PreviewCompatibleImage from './PreviewCompatibleImage';

class ServicelistitemRoll extends React.Component {
	render() {
		const { data } = this.props;
		const { edges: posts } = data.allMarkdownRemark;

		return (
			<>
				{posts &&
					posts.map(({ node: post }) => (
						<div key={post.id} className='nav-sub-item'>
							<Link className='sub-font has-text-left' to={post.fields.slug}>
								{post.frontmatter.title}
								{/* {post.frontmatter.page.heading} */}
							</Link>
						</div>
					))}
			</>
		);
	}
}

ServicelistitemRoll.propTypes = {
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.array
		})
	})
};

export default () => (
	<StaticQuery
		query={graphql`
			query ServicelistitemRoll {
				allMarkdownRemark(
					sort: { order: DESC, fields: [frontmatter___date] }
					filter: { frontmatter: { templateKey: { eq: "service-post" } } }
				) {
					edges {
						node {
							excerpt(pruneLength: 400)
							id
							fields {
								slug
							}
							frontmatter {
								title
								templateKey
								date(formatString: "MMMM DD, YYYY")
								featuredpost
								featuredimage {
									childImageSharp {
										fluid(maxWidth: 120, quality: 100) {
											...GatsbyImageSharpFluid
										}
									}
								}
							}
						}
					}
				}
			}
		`}
		render={(data, count) => <ServicelistitemRoll data={data} count={count} />}
	/>
);