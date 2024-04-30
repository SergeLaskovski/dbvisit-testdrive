import React, { useEffect, useRef, FC } from "react";
import videojs from "video.js";

// Styles
import "video.js/dist/video-js.css";

interface IVideoPlayerProps {
    options: videojs.PlayerOptions;
    onEnded: Function;
}

const initialOptions: videojs.PlayerOptions = {
    controls: true,
    fluid: true,
    controlBar: {
        volumePanel: {
            inline: false
        }
    }
};

const VideoPlayer: FC<IVideoPlayerProps> = ({ options }) => {
    const videoNode = useRef<HTMLVideoElement | null>(null);
    const player = useRef<videojs.Player>();

    useEffect(() => {
        player.current = videojs(videoNode.current!, {
            ...initialOptions,
            ...options
        }).ready(function () {
            // console.log('onPlayerReady', this);
        });
        return () => {
            if (player.current) {
                player.current.dispose();
            }
        };
    }, [options]);

    return <video ref={videoNode} className="video-js" />;
};

export default VideoPlayer;
