import React from 'react'

import { ToggleButtonGroup, Button } from '@mui/joy';

const ButtonGroupComponent = ({ buttonOptions, selectedOption, onOptionChange }) => {

    const [value, setValue] = React.useState('md');

    return (
        <div>
            <ToggleButtonGroup
                value={selectedOption}
                exclusive
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                        onOptionChange(newValue);
                    }
                }}
            >
                {buttonOptions.map((option) => (
                    <Button key={option} value={option}>
                        {option}
                    </Button>
                ))}
            </ToggleButtonGroup>
        </div>
    )
}

export default ButtonGroupComponent