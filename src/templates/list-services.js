import React from 'react';
import { graphql } from 'gatsby';

const ServiceList = ({ data, pageContent }) => {
	return <h1>{}</h1>;
};

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

export default ServiceList;
