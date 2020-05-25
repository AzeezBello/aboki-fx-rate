import React from 'react'
import Layout from '../../layouts/newspaper'
import { RichText } from 'prismic-reactjs';

import { newsPostAPI } from '../../api';
// We create this in just a tick
import { linkResolver } from '../../helpers';
import getWidth from '../../layouts/utility'

import {
    Container,
    Header,
    Grid,
    Responsive,
    Sticky,
    Rail,
    Segment
} from 'semantic-ui-react'
import SocialShareWidget from '../../components/SocialShareWidget'


class NewsPost extends React.Component {

    static async getInitialProps({ query }) {
        // we get the slug of the post so that we can
        // query the API with it
        const { slug } = query;
        const response = await newsPostAPI(slug);
        return {
            post: response
        };
    }

    addJSONLD(post, info, url) {
        return {
            __html: `{
          "@context": "http://schema.org",
          "@type": "NewsPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${url}"
          },
          "headline": "${post.og_title.length ? post.og_title[0].text : ''}",
          "image": [
            "${post.og_image.url ? post.og_image.url : ''}"
          ],
          "datePublished": "${info.first_publication_date}",
          "dateModified": "${info.first_publication_date}",
          "author": {
            "@type": "Organization",
            "name": "AbokiFX Rate
          },
          "publisher": {
            "@type": "Organization",
            "name": "AbokiFX Rate",
            "logo": {
              "@type": "ImageObject",
              "url": "/static/assets/android-chrome-512x512.png"
            }
          },
          "description": "${post.og_description.length ? post.og_description[0].text : ''}"
        }`
        };
    }

    renderHeader(post) {
        return (
            <Container style={{
                backgroundImage: `url(${post.og_image.url ? post.og_image.url : ''})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                position: 'relative',
                minHeight: 'inherit'
            }} fluid>
            </Container>
        )
    }

    render() {
        const post = this.props.post.data
        const info = this.props.post;
        const url = `https://www.yourdomain.ie/blog/${info.uid}`;
        const meta = {
            title: '',
            description: 'Index description'
        }

        return (
            <Layout meta={meta} heading={this.renderHeader(post)}>
                <Container style={{ paddingBottom: '50px' }}>
                    <Grid centered columns={1} reversed>
                        <Grid.Column mobile='sixteen' computer='thirteen' floated='right'>
                            <Header content={post.title.length ? post.title[0].text : ''} as='h1' textAlign='center' />
                            <Segment padded>
                                <article>
                                    {RichText.render(post.body, linkResolver)}
                                </article>
                            </Segment>
                            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                                <Rail position='left' attached='bottom'>
                                    <Sticky>
                                        <Segment padded vertical size='massive'>
                                            <SocialShareWidget 
                                                content={post.og_description.length ? post.og_description[0].text : ''}
                                                linkID={info.uid}
                                                dropdown
                                            />
                                        </Segment>
                                    </Sticky>
                                </Rail>
                            </Responsive>
                        </Grid.Column>
                    </Grid >
                </Container>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={this.addJSONLD(post, info, url)}
                />
            </Layout>
        )
    }
}

export default NewsPost
