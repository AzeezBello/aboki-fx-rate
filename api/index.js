import Prismic from 'prismic-javascript';
import { PRISMIC_API_URL } from '../config';

const docAPI = async (params, docID) => {
    try {
        // We initialise the API with Prismic's kit
        const API = await Prismic.api(PRISMIC_API_URL);
        // Here we just query the documents with a filter of only returning
        // the type of blog_post and order them. Full docs can be found here:
        // https://github.com/prismicio/prismic-javascript#query-the-content
        const response = await API.query(
            Prismic.Predicates.at('document.type', docID),
            {
                orderings: '[document.last_publication_date desc]',
                ...params
            }
        )
        return response;
    } catch (error) {
        return error;
    }
}

const newsPostAPI = async slug => {
    try {
        const API = await Prismic.api(PRISMIC_API_URL);
        // we pass up the slug to request the correct post
        const response = await API.query(
            Prismic.Predicates.at('my.news.uid', slug)
        );
        return response.results[0];
    } catch (error) {
        console.error(error);
        return error;
    }
};

export { docAPI, newsPostAPI };