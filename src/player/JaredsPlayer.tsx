// React Template
import { MediaController, MediaMuteButton, MediaPlayButton } from 'media-chrome/react';
import 'media-chrome/react/media-theme';
import { useRef, useState } from 'react';
import MuxVideo from '@mux/mux-video-react';

export function DadsPlayer () {
    const [isPlaying, setPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);


    const elementRef = useRef(null);

    const resizeElement = () => {
        if (elementRef.current) {
            elementRef.current.style.width = Math.floor(Math.random() * 151) + '%'; // Set your desired width
        }
    };

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

    return (
        <>
            <MediaController ref={elementRef} id="player">
                <MuxVideo
                    ref={videoRef}
                    playbackId="rX2AIcBEIQ01QkyD5CLPEwyfaGr39tRUGzHqRBggVAvU"
                    slot="media"
                    crossOrigin="anonymous"
                    // controls
                    muted
                />
                {/*<MediaPlayButton />*/}
                {/*<MediaMuteButton />*/}
            </MediaController>

            <div className="drawer-container">
                <div className="trigger"></div>
                <div className="drawer">
                    <ul>
                        <li><button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play' }</button></li>
                    </ul>
                </div>
            </div>
            <button onClick={resizeElement} id="resize-button">Fullscreen (maybe)</button>
        </>
    );
}
