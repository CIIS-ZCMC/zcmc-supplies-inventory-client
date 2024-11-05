import { Avatar } from '@mui/joy'

const AvatarComponent = ({ alt, src }) => {

    const avatarStyles = {
        width: 56, height: 56
    }


    return (
        <>
            <Avatar
                sx={{ ...avatarStyles }}
                variant='solid'
                alt={alt}
                src={src}
            />
        </>
    )
}

export default AvatarComponent