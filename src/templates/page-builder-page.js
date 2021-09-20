import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { PageEditor } from '../components/PageBuilder';

export const PageBuilderTemplate = () => {
    return (
        <section className="section">
            <div className="container content">
                <div className="">
                    <PageEditor />
                </div>
            </div>
        </section>
    )
}

PageBuilderTemplate.propTypes = {
    Surveyjson: PropTypes.object,
}

const PageBuilderPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;

    return (
        <Layout>
            <PageBuilderTemplate />
        </Layout>
    )
}

PageBuilderPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
}

export default PageBuilderPage

export const pageBuilderPageQuery = graphql`
  query PageBuilderPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
          title
      }
    }
  }
`
