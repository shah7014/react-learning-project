import React, {useState} from "react";
import {StarBorder, StarRate} from "@mui/icons-material"
import {Stack} from "@mui/material";

interface IProps {
    maxRating: number,
    onChange: (rate: number) => void
}


const StarRating: React.FC<IProps> = ({maxRating = 10, onChange}: IProps) => {

    const [hoverRating, setHoverRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);

    const handleSelection = (starIndex: number) => {
        setSelectedRating(starIndex);
        onChange(starIndex);
    }

    return <Stack flexDirection={"row"} alignItems={"center"}>
        {Array.from({length: maxRating}, (_, i) => i + 1).map(index =>
            (hoverRating ? hoverRating >= index : selectedRating >= index) ? (
                <StarRate
                    onMouseEnter={() => setHoverRating(index)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleSelection(index)}
                    key={index}
                    sx={{cursor: "pointer"}}
                />
            ) : (
                <StarBorder
                    onMouseEnter={() => setHoverRating(index)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleSelection(index)}
                    key={index}
                    sx={{cursor: "pointer"}}
                />
            )
        )
        }
    </Stack>
}

export default StarRating;


