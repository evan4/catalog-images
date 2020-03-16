import React from 'react';
import { connect } from 'react-redux';

import './imagesBlock.scss';
import {addTag} from '../../redux/image/image.actions';

function ImagesBlock({images, group, dispatch}) {

  function tagLoad(tag, e){
    let tagEl = e.target;
    /* tagEl.contentWindow.document.addEventListener("onclick",(e) => {
     console.log(tag);
   },true); */
  }
  
  if(group){
    let setTags = new Set();
    images.forEach(image => setTags.add(image.tag));
    setTags = Array.from(setTags);
    return (
      <div className="images">
      {
        setTags.map((tag, index) => (
          <div key={index}
          className="images__container">
            <p className="images__tag">{tag}</p>
            {
              images.map((image) => {
                if(image.tag === tag){
                  return (
                    <iframe 
                    src={image.imageUrl} 
                    loading="lazy"
                    key={image.id}
                    title={image.id}
                    className="images__item"
                    width="250" 
                    frameBorder="0"></iframe>
                  )
                }
              })
            }
            
          </div>
        ))
      }
      </div>
    )
  }else{
    return (
      <div className="images">
      {
          images.map(image => (
              <iframe src={image.imageUrl} 
                loading="lazy"
                id={image.id}
                key={image.id}
                title={image.id}
                onLoad={(e) => {tagLoad(image.tag, e)}}
                className="images__item"
                width="250" 
                style={{
                  
                }}
                frameBorder="0"></iframe>
            ))
          }
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    images: state.images.images,
    group: state.images.group,
  }
};

export default connect(mapStateToProps)(ImagesBlock);