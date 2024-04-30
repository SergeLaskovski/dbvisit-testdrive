import React, { useState, useRef } from 'react';

import StandbyLaptop from "/src/assets/img/Standby-comp.png";
import DbvisitAnimated from "/src/assets/img/Dbvisit_Animated.gif";
import VideoFile from "/src/assets/video.mp4";

import "video.js/dist/video-js.css";
import './ShowVideo.scss';

const ShowVideo = () => {

    const [showImages, setShowImages] = useState<boolean>(false);
    const videoRef = useRef<HTMLDivElement | null>(null);

    import('video.js').then(({ default: videojs }) => {

        const videoJsOptions = {
            autoplay: true,
            controls: true,
            responsive: true,
            fluid: true,
            muted: true,
            sources: [{
                src: VideoFile,
                type: 'video/mp4'
            }]
        };

        // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
        const videoElement = document.createElement("video-js");
        videoElement.classList.add('vjs-big-play-centered');
        videoRef.current?.appendChild(videoElement);

        const player = videojs(videoElement, videoJsOptions, () => {
            player.on('ended', () => {
                setShowImages(true);
                player.dispose();
            });
        });
    });

    if (showImages) {
        return (
            <div className='load-images'>
                <img src={DbvisitAnimated} className="dbvisit-animated"></img>
                <img src={StandbyLaptop} className="standby-laptop"></img>
            </div>
        )
    } else {
        return (
            <div className='load-images vid'>
                <div ref={videoRef}></div>
            </div>
        )
    }


}

export default ShowVideo;