import React from 'react'
import Layout from '../../layouts/newspaper'
import { Link } from '../../routes'
import { docAPI } from '../../api'
import PostWidget from '../../components/PostWidget'


import {
    Container,
    Header,
    Button,
    Divider,
} from 'semantic-ui-react'

const meta = {
    title: 'AbokiFxRate - The World"s Trusted Currency Authority',
    description: 'Index description'
}


const HomePage = ({ post = [] }) => {
    const RenderHeader = () => (
        <Container style={{
            backgroundImage: `url(${post.data.og_image.url ? post.data.og_image.url : ''})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
            minHeight: 'inherit'
        }} fluid>
            <div style={{
                display: 'inlineBlock',
                textAlign: 'center',
                position: 'relative',
                top: '200px',
            }}>
                <Header as='h1'
                    subheader='Published by AbokiFx' content={post.data.title[0].text} inverted
                />
                <Link route='news' params={{ 'slug': post.uid }}>
                    <Button style={{marginTop: '100px'}} color='orange' content='Read More' />
                </Link>
                <div style={{paddingTop: '100px'}}>
                    <Button color='orange' icon='angle double down' disabled/>
                </div>
            </div>
        </Container>
    )
    return (
        <Layout meta={meta} heading={<RenderHeader />}>
            <Container style={{ paddingBottom: '50px' }}>
                <Divider content='Nigerian Newspapers' horizontal style={{paddingBottom: '50px'}} />
                <PostWidget />
            </Container>
        </Layout>
    )
}

HomePage.getInitialProps = async () => {
    // Here we call the API and request 5 documents
    const response = await docAPI({ pageSize: 1 }, 'news')
    return {
        post: response.results[0]
    }
}

export default HomePage

