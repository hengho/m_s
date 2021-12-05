import React from 'react';
import { movieapi, tvapi } from '../../api';
import DetailPresenter from './DetailPresenter';

export default class extends React.Component{
    constructor(props){
        super(props);
        const {location: {pathname}} = props;
        this.state = {
            result: null,
            error:null,
            loading:true,
            isMovie: pathname.includes('/movie/')
        }
    }
    

    async componentDidMount(){
        const {
            match:{
                params: {id}
            },
            history: {push},
            location: {pathname}
        } = this.props;
        const {isMovie} = this.state;
        const parsedId = parseInt(id);
        if(isNaN(parsedId)){
            return push('/'); //return은 function을 끝내기 위해 사용
        }
        let result;
        try{
            if(isMovie){
                ({data: result} = await movieapi.movieDetail(parsedId));
            }
            else{
                ({data: result} = await tvapi.showDetail(parsedId));
            }
        }catch{
            this.setState({error: "can't find anything."});
        }finally{
            this.setState({ loading: false, result })
        }
    }

    render() {
        const { result, error, loading } = this.state;
        return(
            <DetailPresenter
                result={result}
                error={error}
                loading={loading}
            />
        );
    }
}