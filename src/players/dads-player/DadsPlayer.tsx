// React Template
import { MediaController } from 'media-chrome/react';
import { useRef } from 'react';
import '@mux/mux-video';

interface PlayerProps {
    isPlaying: boolean;
}

export function DadsPlayer ({ isPlaying }: PlayerProps) {
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
                <mux-video
                    ref={videoRef}
                    playback-id="PLtkNjmv028bYRJr8BkDlGw7SHOGkCl4d"
                    slot="media"
                    crossorigin
                    muted
                />
            </MediaController>
        </>
    );
};
