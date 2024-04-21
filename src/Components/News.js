import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  
  handlenext=async()=>{
    if(Math.ceil(this.state.page+1>this.state.totalResults/20)){

    }
    else{
    let url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=e50468325df74c05bf409738298163cb&page=${this.state.page+1}&pageSize=20`;
    let data= await fetch(url);
    let parsedData=await data.json();
    this.setState({    
      articles:parsedData.articles,
      page:this.state.page+1
    
    })
  }
  }
  handleprev=async()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=e50468325df74c05bf409738298163cb&page=${this.state.page-1}&pageSize=20`;
    let data= await fetch(url);
    let parsedData=await data.json();
    this.setState({articles:parsedData.articles,page:this.state.page-1})
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
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=e50468325df74c05bf409738298163cb";
    let data= await fetch(url);
    let parsedData=await data.json();
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults})
  }

  render() {
    return (
      <div className='container my-3' >
        <h2>Newsmonkee Top Headlines</h2>
       
        <div className='row'>
     
        {this.state.articles.map((element)=>
        { 
         return <div className="col-md-4" key={element.url} >
        <NewsItem  title={element.title} description={element.description} imageUrl={element.urlToImage} url={element.url} />
        </div>
        })}
           
      </div>
      <div className="container d-flex justify-content-between ">
      <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprev} >&larr; Previous</button>
 <button type="button" className="btn btn-dark" onClick={this.handlenext}>Next &rarr;</button>
  </div>
      </div>
   
    )
  }
}

export default News
