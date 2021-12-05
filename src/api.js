import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key:'3d590b70b3c48de3f70be3a45ddc4154',
        language:'en-US'
    }
})

export const movieapi = {
    nowPlaying: () => api.get('movie/now_playing'),
    upcoming: () => api.get('movie/upcoming'),
    popular: () => api.get('movie/popular'),
    movieDetail: (id) => api.get(`movie/${id}`, {
        params: {
            append_to_response: 'videos'
        }
    }),
    search: (term) => api.get('search/movie', {
        params: {
            query: encodeURIComponent(term)
        }
    })
};

export const tvapi = {
    topRated: () => api.get('tv/top_rated'),
    popular: () => api.get('tv/popular'),
    airingToday: () => api.get('tv/airing_today'),
    showDetail: (id) => api.get(`tv/${id}`, {
        params: {
            append_to_response: 'videos'
        }
    }),
    search: (term) => api.get('search/tv', {
        params: {
            query: encodeURIComponent(term)
        }
    })
};