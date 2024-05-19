import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

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
  handlenext=async()=>{
    if(!(Math.ceil(this.state.page+1>this.state.totalResults/this.props.pageSize))){
    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e50468325df74c05bf409738298163cb&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parsedData=await data.json();
    this.setState({    
      articles:parsedData.articles,
      page:this.state.page+1,
      loading:false
    })
  }
  }
  handleprev=async()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e50468325df74c05bf409738298163cb&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parsedData=await data.json();
    this.setState({articles:parsedData.articles,page:this.state.page-1,loading:false})
  }
  constructor (){
    super();
    this.state={
    articles:[],
    loading:false,
    page:1
    }
  }
   async componentDidMount(){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e50468325df74c05bf409738298163cb&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data= await fetch(url);
    let parsedData=await data.json();
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
  }

  render() {
    return (
      
      <div className='container my-3' >
       <h1 className="text-center">Newsmonkee Top Headlines</h1>
       {this.state.loading && <Spinner/>}
        <div className='row'>
     
        { !this.state.loading && this.state.articles.map((element)=>
        { 
         return <div className="col-md-4" key={element.url} >
        <NewsItem  title={element.title} description={element.description} imageUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
        </div>
        })}
           
      </div>
      <div className="container d-flex justify-content-between ">
      <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprev} >&larr; Previous</button>
 <button disabled={this.state.page+1>this.state.totalResults/this.props.pageSize} type="button" className="btn btn-dark" onClick={this.handlenext}>Next &rarr;</button>
  </div>
      </div>
   
    )
  }
}

export default News
