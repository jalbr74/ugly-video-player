import { MediaController } from 'media-chrome/react';
import { useRef, useState, useEffect } from 'react';
import MuxVideo from '@mux/mux-video-react';

interface PlayerProps {
    isPlaying: boolean;
}

export function Player ({ isPlaying }: PlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    }

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    }

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (videoRef.current) {
            videoRef.current.currentTime = Number(event.target.value);
        }
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
            videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
        }
    }, []);

    return (
        <>
            <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
            <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSliderChange}
            />
            <MediaController id="player">
                <MuxVideo
                    ref={videoRef}
                    playbackId="PLtkNjmv028bYRJr8BkDlGw7SHOGkCl4d"
                    slot="media"
                    crossOrigin="anonymous"
                    muted
                />
            </MediaController>
        </>
    );
}