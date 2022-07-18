import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';


export class News extends Component {
  articles = [];
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,  //constructor() runs at very first, so we defined state here
      loading: false,
      page: 1
    }
    document.title= `${this.props.category} - NEWS App`;
  }

  //fetching data from api & parsing it in the form of json or object
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=5fc737cb208a415c8ed68707e7c59cad&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true}); //spinner will spin till it is true
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false}); //now spinner will stop
  }

  //prev & next click function
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=5fc737cb208a415c8ed68707e7c59cad&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    });
  }
  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=5fc737cb208a415c8ed68707e7c59cad&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      });
    }
  }

  render() {
    return <div className='container my-3'>

      <h3 className='text-center'>NEWS App - Top Headlines</h3>
      {this.state.loading && <Spinner/>}
      <div className='row'>

        {this.state.articles.map((ele) => {
          return <div className='col-md-4' key={ele.url}>
            <NewsItem title={ele.title} description={ele.description ? ele.description.slice(0, 88) : ""} imageUrl={ele.urlToImage} newsUrl={ele.url} author={ele.author? ele.author : "Unknown"} date={ele.publishedAt} source={ele.source.name}/>
          </div>
        })}

      </div>
      <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
    </div>;
  }
}

export default News;
