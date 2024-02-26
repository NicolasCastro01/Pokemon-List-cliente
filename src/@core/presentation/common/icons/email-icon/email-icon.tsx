interface EmailIconProps {
    width?: number;
    height?: number;
    fill?: string;
}

export default function EmailIcon({ width = 24, height = 24, fill = "#000" }: EmailIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            style={{ msFilter: "" }}
            fill={fill}
        >
            <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4.7l-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"></path>
        </svg>
    );
}
