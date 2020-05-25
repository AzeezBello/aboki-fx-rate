import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { docAPI } from '../api'

export default class AdsWidget extends React.Component {
    constructor(props) {
        super(props)
        this.state = { adPosts: [] }
    }

    async componentWillMount() {
        const response = await docAPI({ pageSize: this.props.ads || 2 }, 'ads')
        this.setState({ adPosts: response.results || [] })
    }

    render() {
        return (
            <Card.Group centered>
                {this.state.adPosts.map(ad => (
                    <Card
                        href={ad.data.content_link.url}
                        link
                        color='orange'
                    >
                    {ad.data.slices[0].items.map(item => (<Image  src={item.embed_link.embed_url||item.image.url} />))}
                    </Card>
                ))}
            </Card.Group>
        )
    }
}