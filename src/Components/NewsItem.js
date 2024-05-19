import React, { Component } from 'react'

export class NewsItem extends Component {

  
  render() {
    let {title,description,imageUrl,url,author,date,source}=this.props;
    return (
      <div className='container my-3' >
       <div className="card" >
      <img src={imageUrl} className="card-img-top" alt="..."/>
     <div className="card-body">
     <h5 className="card-title">{title}</h5>
     <p className="card-text">{description}</p>
     <p className="card-text"><small className="text-body-secondary">By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
     <span className="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-danger">
    {source}
  </span>
     <a rel='noreferrer' href={url} target='_blank' className="btn btn-sm btn-dark">Read More</a>
     </div>
</div>
      </div>
     
    )
  }
}

export default NewsItem
