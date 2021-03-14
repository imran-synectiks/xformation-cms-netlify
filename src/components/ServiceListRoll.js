import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import PreviewCompatibleImage from './PreviewCompatibleImage';

class ServiceListRoll extends React.Component {
	render() {
		const { data } = this.props;
		const { edges: posts } = data.allMarkdownRemark;

		return (
			<div className='columns is-multiline'>
				{posts &&
					posts.map(({ node: post }) => (
						<div className='is-parent column is-6' key={post.id}>
							<article
								className={`blog-list-item tile is-child box notification ${post.frontmatter
									.featuredpost
									? 'is-featured'
									: ''}`}>
								<header>
									<p className='post-meta'>
										<Link className='title has-text-primary is-size-4' to={post.fields.slug}>
											{post.frontmatter.title}
										</Link>
									</p>
								</header>
							</article>
						</div>
					))}
			</div>
		);
	}
}

ServiceListRoll.propTypes = {
	data: PropTypes.shape({
		allMarkdownRemark: PropTypes.shape({
			edges: PropTypes.array
		})
	})
};

export default () => (
	<StaticQuery
		query={graphql`
			query ServiceListRollQuery {
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
								featuredpost
							}
						}
					}
				}
			}
		`}
		render={(data, count) => <ServiceListRoll data={data} count={count} />}
	/>
);
