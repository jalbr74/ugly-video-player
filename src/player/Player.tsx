// React Template
import { MediaController } from 'media-chrome/react';
import { useRef } from 'react';
import MuxVideo from '@mux/mux-video-react';

interface PlayerProps {
    isPlaying: boolean;
}

export function Player ({ isPlaying }: PlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
        }
    }

    return (
        <>
            <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>

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
