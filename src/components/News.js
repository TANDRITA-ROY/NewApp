import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


 const News = (props) =>  {
 
  const [airticles, setAirticles]=useState([])
  const [loading, setLoading]=useState(true)
  const [page, setPage]=useState(1)
  const [totalResults, settotalResults]=useState(0)

const capitalizeFirstLetter= (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
 }

 const updateNews = async () =>
   {
    props.setProgress(10);
    const url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e83441625e714a4c96202d3219f03350&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data=await fetch(url);
    props.setProgress(35);
    let formattedData=await data.json();
    props.setProgress(75);
   setAirticles(formattedData.articles)
   settotalResults(formattedData.totalResults)
   setLoading(false)
    props.setProgress(100);
   }

  useEffect( ()=>{
   updateNews();
   // eslint-disable-next-line
 }, [])
 
  const fetchMoreData = async () =>
  {
    
    let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page+1)  
    let data=await fetch(url);
      let formattedData=await data.json();
      setAirticles( airticles.concat( formattedData.articles))
      settotalResults(formattedData.totalResults)     
  }

 
    return (
       <>
         <h1 className="text-center" style={{margin:'35px 0px',marginTop:'90px'}}>NewsApp Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner/>}
            <InfiniteScroll
              dataLength={airticles.length}
              next={fetchMoreData}
              hasMore={airticles.length !== totalResults}
              loader={<Spinner/>}>
                <div className="container">
                  <div className="row ">
                      {airticles.map((e)=>{
                      return <div className="col-md-4" key={e.url}>
                      <NewsItem title={e.title?e.title.slice(0, 20):""} description={e.description?e.description.slice(0, 88):""} url={e.url} urlToImage={e.urlToImage} author={e.author} publishedAt={e.publishedAt} source={e.source.name} />  
                      </div> })}
                  </div>
                </div>
            </InfiniteScroll>
        </>                     
      )
}

News.defaultProps= {
  pageSize:20,
  country:'in' ,
  category:'general'
}
News.propTypes={
 pageSize:PropTypes.number,
 country:PropTypes.string ,
 category:PropTypes.string
}
export default News

// {/*
// // Next And Previous buttons
//  <div className="container d-flex justify-content-between my-3">
//               <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevClk} class="btn btn-dark">&larr; Previous</button>
//               <button type="button" disabled={this.state.page+1>( Math.ceil(this.state.totalResults/this.props.pageSize))} onClick={this.handleNextClk} class="btn btn-dark">Next &rarr;</button>
//                 </div>   
//                handlePrevClk = async ()=>
//   {
//      this.setState({ page: this.state.page -1 })
//      this.updateNews()
//   }
//   handleNextClk = async ()=>
//   {
//     this.setState({ page: this.state.page + 1 })
//     this.updateNews()  
//   }
//               */}