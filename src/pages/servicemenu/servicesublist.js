import React from 'react';
import Layout from '../../components/Layout';
import ServiceListRoll from '../../components/ServiceListRoll';
import { graphql } from 'gatsby';

const serviceSub = ({ data }) => {
	const { frontmatter } = data;
	return (
		<Layout>
			<section className='section'>
				<div className='container'>
					<div className='content'>
						<h1>hello</h1>{' '}
					</div>
				</div>
			</section>
		</Layout>
	);
};
export default serviceSub;
export const query = graphql`
	{
		allMarkdownRemark {
			edges {
				node {
					frontmatter {
						page {
							heading
						}
					}
				}
			}
		}
	}
`;
