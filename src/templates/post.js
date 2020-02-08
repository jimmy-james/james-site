import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import documentToReactComponent from '../utils/documentToReactComponents'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
*/
const Post = ({ data, location }) => {
    const post = data.contentfulPost

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />

            <Layout>
                <div className="container">
                    <article className="content">
                        <figure className="post-feature-image">
                            <img src={ post.featureImage.file.url } alt={ post.title } />
                        </figure>
                        <section className="post-full-content">
                            <h1 className="content-title">{post.title}</h1>
                            <span>{ post.primaryAuthor.name }</span>
                            {/* The main post content */ }
                            <section className="content-body load-external-scripts">
                                {documentToReactComponent(post.childContentfulPostContentRichTextNode.json)}
                            </section>
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        contentfulPost: PropTypes.shape({
            title: PropTypes.string.isRequired,
            featureImage: PropTypes.object,
            primaryAuthor: PropTypes.object,
        }),
    }),
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        contentfulPost(slug: { eq: $slug }) {
            title
            primaryAuthor {
                name
            }
            featureImage {
                file {
                    url
                }
            }
            childContentfulPostContentRichTextNode {
                json
            }
        }
    }
`
