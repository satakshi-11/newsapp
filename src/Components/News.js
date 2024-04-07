import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  
  constructor (){
    super();
    console.log("Hello I am constructor from news ")
    this.state={
    articles:[],
    loading:false
    }
  }
   async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=e50468325df74c05bf409738298163cb";
    let data= await fetch(url);
    let parseData=await data.json();
    this.setState({articles:parseData.articles})
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
      </div>
    )
  }
}

export default News
