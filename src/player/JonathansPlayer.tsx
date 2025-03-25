import { MediaController } from 'media-chrome/react';
import { useRef, useState, useEffect } from 'react';
import MuxVideo from '@mux/mux-video-react';
import "./JonathansPlayer.css";

export function JonathansPlayer () {
    const videoRef = useRef<HTMLVideoElement>(null);
    const sliderRef = useRef<HTMLInputElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isReversed, setIsReversed] = useState(false);
    const [reverseInterval, setReverseInterval] = useState<NodeJS.Timeout | null>(null);
    const [isPlaying, setPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(0);

    const elementRef = useRef(null);

    const resizeElement = () => {
        if (elementRef.current) {
            elementRef.current.style.width = Math.floor(Math.random() * 151) + '%'; // Set your desired width
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = playbackSpeed;
        }
    }, [playbackSpeed]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setPlaying(false);
            } else {
                videoRef.current.play();
                setPlaying(true);
            }
        }
    }

    const setReverse = (value : boolean) => {
        if (videoRef.current) {
            if (isReversed) {
                clearInterval(reverseInterval!);
                videoRef.current.play();
            } else {
                videoRef.current.pause();
                const interval = setInterval(() => {
                    if (videoRef.current) {
                        videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - (videoRef.current.playbackRate/10));
                    }
                }, 100);
                setReverseInterval(interval);
            }
            setIsReversed(value);
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
        let angle = 0;
        if (sliderRef.current) {
            const transform = sliderRef.current.style.transform;
            const match = transform.match(/rotate\(([-\d.]+)deg\)/);
            angle = match ? parseFloat(match[1]) : 0;
            console.log('Current angle:', angle);
        }
        if (videoRef.current) {
            const newPlaybackSpeed = Math.abs(angle); // Adjust the divisor as needed
            console.log('New playback speed:', newPlaybackSpeed);
            setPlaybackSpeed(newPlaybackSpeed);
        }

        if(!isReversed && angle < 0) {
            setReverse(true); // Set reverse based on angle
        }
        if(isReversed && angle >= 0) {
            setReverse(false);
        }
    }

    const handleMouseDown = () => {
        setIsDragging(true);
    }

    const handleMouseMove = (event: MouseEvent) => {
        if (isDragging && sliderRef.current && isPlaying) {
            const rect = sliderRef.current.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            let angle = (event.clientY - centerY) / 2; // Adjust the divisor to control sensitivity
            angle = Math.min(Math.max(angle, -16), 16); // Clamp the angle to prevent excessive rotation
            sliderRef.current.style.transform = `rotate(${angle}deg)`;
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false);
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
            videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }

            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [isDragging]);

    return (
        <>
            <div className={'slider-container'}>
                <div className="drawer-container">
                    <div className="trigger"></div>
                    <div className="drawer">
                        <ul>
                            <li><button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play' }</button></li>
                        </ul>
                    </div>
                </div>
                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSliderChange}
                    className="rotated-slider"
                    ref={sliderRef}
                    onMouseDown={handleMouseDown}
                />
                <button onClick={resizeElement} id="resize-button">Fullscreen (maybe)</button>
            </div>
            <div className={'player-container'}>
                <MediaController ref={elementRef} id="player" style={{ width: '200px' }}>
                    <MuxVideo
                        ref={videoRef}
                        playbackId="PLtkNjmv028bYRJr8BkDlGw7SHOGkCl4d"
                        slot="media"
                        crossOrigin="anonymous"
                        muted
                        // style={{ transform: `rotate(${videoAngle}deg)` }}
                    />
                </MediaController>
            </div>


        </>
    );
}
