import React from 'react'

import { ToggleButtonGroup, Button } from '@mui/joy';

const ButtonGroupComponent = ({ buttonOptions, selectedOption, onChange }) => {

    return (
        <div>
            <ToggleButtonGroup
                sx={{
                    mt: 0.9
                }}
                value={selectedOption}
                exclusive
                onChange={(event, newValue) => {
                    if (newValue !== null) {
                        console.log(newValue)
                        onChange(newValue);
                    }
                }}
            >
                {buttonOptions.map(({ id, label, path }) => (
                    <Button key={id} value={path}>
                        {label}
                    </Button>
                ))}
            </ToggleButtonGroup>
        </div>
    );
}

export default ButtonGroupComponent