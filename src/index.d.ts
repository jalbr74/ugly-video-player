interface MuxVideoHTMLAttributes<T> extends React.VideoHTMLAttributes<T> {
    debug?: boolean;
    autoplay?: boolean;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'mux-video': React.DetailedHTMLProps<MuxVideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
        }
    }
}
