import React, { useState , useEffect } from 'react';
import './Recommended.css';
import {API_KEY} from "../data";
import {converter} from "../data";
import moment from "moment";
import {Link} from "react-router-dom";

const Recommended = ({categoryId}) => {

  const [apiData, setApiData]=useState([]);

  const fetchData=async()=>{
    const api_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(api_url).then(response=>response.json()).then(data=>setApiData(data.items));
  }

  useEffect(()=>{
    fetchData();
  },[])
  
  return (
    <div className='Recommended' >
      {apiData.map((item,index)=>{
        return (
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className='side-video-list' key={index}>
            <img src={item.snippet.thumbnails.medium.url} alt="thumbnail" />
            <div className='vid-info'>
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()} </p>
            </div>
          </Link>
        )
      })}
      
      
    </div>
  );
};

export default Recommended;