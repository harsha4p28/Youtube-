import React, { useEffect } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { API_KEY } from '../../data';
import { useState } from 'react';
import { converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {

  const {videoId}=useParams();
  const [apiData, setApiData]=useState(null);
  const [channelData, setChannelData]=useState(null);
  const [commentData, setCommentData]=useState([]);
  
  const fetchVideoData= async()=>{
    const videoDetails_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    await fetch(videoDetails_url).then(response=>response.json()).then(data=>setApiData(data.items[0]))
  }
  const fetchChannelData= async()=>{
    const channelDetails_url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
    await fetch(channelDetails_url).then(response=>response.json()).then(data=>setChannelData(data.items[0]))

    const comment_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
    await fetch(comment_url).then(response=>response.json()).then(data=>setCommentData(data.items))
  }
  
  useEffect(()=>{
    fetchVideoData();
  },[])

  useEffect(()=>{
    fetchChannelData();
  },[apiData])

  
  return (
    <div className='play-video'>
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; 
      encrypted-media; gyroscope; picture-in-picture;webshare" ></iframe>
      <h3>{apiData?apiData.snippet.title:"Title"}</h3>
      <div className='video-info'>
        <p>{apiData?converter(apiData.statistics.viewCount):"0" } Views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():" " }</p>
        <div> 
          <span><img src={like} alt="Like" />{apiData?converter(apiData.statistics.likeCount):""} </span>
          <span><img src={dislike} alt="Dislike" /></span>
          <span><img src={share} alt="Share" />Share</span>
          <span><img src={save} alt="Save" />Save</span>
        </div>
        
      </div>
        <hr />
        <div className='video-creator'>
          <img src={channelData? channelData.snippet.thumbnails.default.url:" "} alt="Profile " />
          <div>
            <p>{apiData?apiData.snippet.channelTitle:"Channel Name"} </p>
            <span> {channelData?converter(channelData.statistics.subscriberCount):"1M"} subscribers</span>
          </div>
          <button type="button" className='button'>Subscribe</button>
        </div>
        <div className="description">
          <p>{apiData?apiData.snippet.description.slice(0,250):"Description" }</p>
          <hr />
          <h4>{apiData?converter(apiData.statistics.commentCount):"20 "} comments</h4>
          {commentData.map((item, index) => {
            const comment = item.snippet.topLevelComment.snippet;
            return (
              <div key={index} className="comment-section">
                <img src={comment.authorProfileImageUrl} alt="User profile" />
                <div>
                  <h3>{comment.authorDisplayName} <span>{moment(comment.publishedAt).fromNow()}</span></h3>
                  <p>{comment.textDisplay}</p>
                  <div className="comment-action">
                    <img src={like} alt="Like" />
                    <span>{comment.likeCount}</span>
                    <span><img src={dislike} alt="Dislike" /></span>
                  </div>
                </div>
              </div>
            );
          })}   
        </div>
    </div>
  );
};

export default PlayVideo;