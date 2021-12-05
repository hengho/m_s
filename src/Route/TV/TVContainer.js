import React from 'react';
import { tvapi } from '../../api';
import TVPresenter from'./TVPresenter';

export default class extends React.Component{
    state = {
        topRated: null,
        popular: null,
        airingToday: null,
        loading: true,
        error: null
    };

    async componentDidMount() {
        try{
            const {data:{results: topRated}} = await tvapi.topRated();
            const {data:{results: popular}} = await tvapi.popular();
            const {data:{results: airingToday}} = await tvapi.airingToday();
            this.setState({
                topRated,
                popular,
                airingToday
            })
        }catch{
            this.setState({
                error: "Can't find TV information."
            })
        }finally{
            this.setState({
                loading: false
            })
        }
        
    }

    render() {
        const {
            topRated,
            popular,
            airingToday,
            loading,
            error
        } = this.state;
        return <TVPresenter 
            topRated={topRated}
            popular={popular}
            airingToday={airingToday}
            loading={loading}
            error={error}
        />
    }
}