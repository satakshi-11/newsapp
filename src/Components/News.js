import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps={
    pageSize : 7,
    country : 'in',
    category : 'general'

  }
  static propTypes={
    pageSize : PropTypes.number,
    country : PropTypes.string,
    category: PropTypes.string
  }
  fetchMoreData = async() => {
   this.setState({page: this.state.page +1});
   const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
 
   let data= await fetch(url);
   let parsedData=await data.json();
   this.setState({
    articles:this.state.articles.concat(parsedData.articles),
    totalResults:parsedData.totalResults
   })
 
  };
  async updateNews(){
    this.props.setProgress(0);
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parsedData=await data.json();
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
    this.props.setProgress(100);
  }
  async componentDidMount(){
    this.updateNews();
  }
  handlenext=async()=>{
    this.setState({page:this.state.page+1});
    this.updateNews();
  }
  
  handleprev=async()=>{
    this.setState({page:this.state.page+1});
    this.updateNews();

  }
  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor (props){
    super(props);
    this.state={
    articles:[],
    loading:true,
    page:1,
    totalResults:0
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-News Monkee`;
  }
 

  render() {
    return (
      <>
       <h1 className="text-center">Newsmonkee {this.capitalizeFirstLetter(this.props.category)} Top Headlines</h1>
       {this.state.loading && <Spinner/>} 
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
         <div className='container'>

        <div className='row'>     
        {this.state.articles.map((element)=>
        { 
         return <div className="col-md-4" key={element.url} >
        <NewsItem  title={element.title} description={element.description} imageUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
        </div>
        })}
           
      </div>
      </div>
      </InfiniteScroll>
      
      </>
    )
  }
}

export default News
