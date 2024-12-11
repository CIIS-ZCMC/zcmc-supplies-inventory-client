import React from 'react'
import { IconButton } from '@mui/joy'
import PropTypes from 'prop-types'

// This component accepts props for customization
const IconButtonComponent = ({ icon: Icon, iconSize, color = 'neutral', size = 'md', onClick, ...rest }) => {
    return (
        <IconButton
            color={color}
            size={size}
            onClick={onClick}
            variant='plain'
            {...rest}
        >
            <Icon size={iconSize} />
        </IconButton>
    )
}

// Define prop types for validation
IconButtonComponent.propTypes = {
    icon: PropTypes.elementType.isRequired, // Pass in the icon as a component, e.g., X from lucide-react
    color: PropTypes.oneOf(['primary', 'neutral', 'danger', 'info', 'success', 'warning']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    onClick: PropTypes.func
}

export default IconButtonComponent
