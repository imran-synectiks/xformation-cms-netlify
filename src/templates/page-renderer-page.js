import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { PageRendererComponent } from '../components/PageRenderer';

export const PageRenderTemplate = ({
    pagerendererjson
}) => {
    const data = pagerendererjson ? JSON.parse(pagerendererjson.data) : [];
    return (
        <section className="section">
            <div className="container content">
                <div className="">
                    <PageRendererComponent data={data} />
                </div>
            </div>
        </section>
    )
}

PageRenderTemplate.propTypes = {
    pagerendererjson: PropTypes.object,
}

const PageRenderPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;
    return (
        <Layout>
            <PageRenderTemplate
                pagerendererjson={frontmatter.pagerendererjson}
            />
        </Layout>
    )
}

PageRenderPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    })
}

export default PageRenderPage

export const PageRenderPageQuery = graphql`
  query PageRenderPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        pagerendererjson {
            data
        }
      }
    }
  }
`
