import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source}= this.props;
    return <>
      <div className="card my-2" style={{width: "18rem"}}>
        <img src={imageUrl? imageUrl : "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/1/8/1/7/217181-6-eng-GB/Hannon-Transport-Ltd-SIC-Food-20132_news_large.jpg"} className="card-img-top" alt="..." />
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{source}</span>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}...</p>
          <p className='card-text'><small className='text-muted'>By {author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    </>;
  }
}

export default NewsItem;
