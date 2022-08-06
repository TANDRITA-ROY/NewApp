import React from 'react'


const NewsItem =(props)=> {
 
    let {title, description, url, urlToImage , author, publishedAt, source}= props
    return (
      <div>
        
        <div className="card " >
          <div style={{ display:'flex',
                        justifyContent:'flex-end',
                        position:'absolute',
                        right:0}}>           
            <span class=" badge rounded-pill bg-danger" >
                {source}</span>
          </div>
            <img src={!urlToImage? "https://i.pinimg.com/736x/b2/a7/8b/b2a78b7520577fc3664213e22bffd2c3.jpg": urlToImage} className="card-img-top" alt="https://i.pinimg.com/736x/b2/a7/8b/b2a78b7520577fc3664213e22bffd2c3.jpg"/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}...</p>
                <p class="card-text"><small class="text-muted">By {!author?"Unknown":author} on {new Date(publishedAt).toGMTString()}</small></p>
                <a href={url}  target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Know More</a>
                
            </div>
        </div>
      </div>
    )
}
//style={{width: "18rem"}}
export default NewsItem