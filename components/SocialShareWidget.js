import React from 'react'
import { List, Container } from 'semantic-ui-react'
import { Twitter, Facebook, Linkedin, Whatsapp } from 'react-social-sharing'
import {NEWS_URL} from '../config'
import { withRouter } from 'next/router'


const SocialShareWidget = ({ linkID = '', page, content, horizontal = false }) => {
    const page_args = page? `/${NEWS_URL}/${linkID}` : `/nigerian-newspapers/${linkID}`
    const link = `${global.origin}${page_args}`
    return (
        <Container textAlign='center'>
            <List horizontal={horizontal}>
                <List.Item>
                    <List.Content>
                        <Facebook
                            small
                            link={link}
                            message={content}
                            simpleReverse={horizontal}
                        />
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Content>
                        <Whatsapp
                            small
                            link={link}
                            message={content}
                            simpleReverse={horizontal}
                        />
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Content>
                        <Twitter
                            small
                            link={link}
                            message={content}
                            simpleReverse={horizontal}
                        />
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Content>
                        <Linkedin
                            small
                            link={link}
                            message={content}
                            simpleReverse={horizontal}
                        />
                    </List.Content>
                </List.Item>
            </List>
        </Container>
    )
}


export default withRouter(SocialShareWidget)

