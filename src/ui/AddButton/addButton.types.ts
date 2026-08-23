// SmartRating.types.ts
export interface SmartRatingProps {
    testIdPrefix: string;
    title?: string;
    theme: "primary" | "secondary";
    disabled?: boolean;
    size?: "small" | "medium" | "large";
}

// SmartRating.tsx
const SmartRating: React.FC<SmartRatingProps> = (props) => {...}