interface SearchIconProps {
    width?: number;
    height?: number;
    fill?: string;
}

export default function SearchIcon({ width = 24, height = 24, fill = "#000" }: SearchIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            style={{ msFilter: "" }}
            fill={fill}
        >
            <path d="M10 2c-4.411 0-8 3.589-8 8s3.589 8 8 8a7.952 7.952 0 004.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0018 10c0-4.411-3.589-8-8-8z"></path>
        </svg>
    );
}
