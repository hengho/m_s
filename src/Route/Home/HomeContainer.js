import React from 'react';
import { movieapi } from '../../api';
import HomePresenter from './HomePresenter';

export default class extends React.Component{
    state = {
        nowPlaying:null,
        upcoing:null,
        popular:null,
        error:null,
        loading:true
    };

    async componentDidMount(){
        try{
            const {data: {results: nowPlaying}} = await movieapi.nowPlaying();  //끝날 때까지 다른 것을 진행하지 말 것 await은 async function 안에서만 쓸 수 있다.
            const {data: {results: upcoming}} = await movieapi.upcoming();
            const {data: {results: popular}} = await movieapi.popular();
            this.setState({
                nowPlaying, //nowPlaying: nowPlaying 과 동일
                upcoming,
                popular

            })
        }
        catch{
            this.setState({
                error: "Can't find movie information."
            })
        }finally {
            this.setState({
                loading: false
            })
        }
        //try: 성공했을 경우 실행,
        //catch: error가 떴을 경우 실행
        //finally: 위 작업이 끝난 후 무조건 실행
    }

    render() {
        const { nowPlaying, upcoming, popular, error, loading } = this.state;
        return(
            <HomePresenter
                nowPlaying={nowPlaying}
                upcoming={upcoming}
                popular={popular}
                error={error}
                loading={loading}
            />
        );
    }
}