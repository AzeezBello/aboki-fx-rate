import React from 'react'
import Layout from '../layouts/default'
import {
    Grid,
    Container,
    Header,
    List,
    Icon
} from 'semantic-ui-react'

const meta = {
    title: 'AbokiFxRate - The World"s Trusted Currency Authority',
    description: 'AbokiFxRate Arabic Rates'
}

class ArabiRates extends React.Component {
    render() {
        return (
            <Layout meta={meta}>
                <Container style={{paddingBottom:'50px'}}>
                    <Header content='Arabic Rates' subheader='AbokiFX. Powering you.' as='h1' inverted textAlign='center'/>
                    <iframe id="iframe" src="https://eldolar.live/ar/widget" width="100%" height="490" frameborder="0"></iframe><br/>
                </Container>      
            </Layout>
        )
    }
}

export default ArabiRates