import { CarouselProvider, Slider } from "pure-react-carousel";
import React from "react";
import TextTruncate from 'react-text-truncate'
import { Header } from 'semantic-ui-react'
import { Link } from '../routes'

import { docAPI } from '../api'

import CustomCardSlide from "./CustomCardSlide";
import CustomDotGroup from "./CustomDotGroup";

class CardCarousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = { newsPosts: [] }
    }

    async componentWillMount() {
        const response = await docAPI({ pageSize: this.props.size || 3 }, 'news')
        this.setState({ newsPosts: response.results || [] })
    }

    render() {
        return (
            <CarouselProvider
                naturalSlideWidth={1}
                naturalSlideHeight={1.25}
                totalSlides={3}
                style={{ paddingBottom: "100px" }}
            >   <Header textAlign='center' content={this.state.newsPosts.length ? 'Latest News' : ''} as='h2' inverted />
                <Slider style={{ paddingBottom: '15px' }}>
                    {this.state.newsPosts.map((news, key) => (
                        <Link
                            route='news'
                            params={{ slug: news.uid }}>
                            <CustomCardSlide
                                image={news.data.og_image.url || '/static/newspaper-placeholder.png'}
                                index={key}
                                header={{ textAlign: 'center', as: 'h4', content: news.data.title[0].text, style: { color: '#fff' } }}
                                meta={
                                    <span style={{ color: '#fff' }}>
                                        <TextTruncate
                                            line={3}
                                            truncateText="…"
                                            text={news.data.og_description.length ? news.data.og_description[0].text : ''}
                                        />
                                    </span>
                                }
                            />
                        </Link>
                    ))}
                </Slider>

                <CustomDotGroup slides={this.props.size || this.state.newsPosts.length} />
            </CarouselProvider>
        )
    }
}

export default CardCarousel;