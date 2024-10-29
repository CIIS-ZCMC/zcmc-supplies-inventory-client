import { Input } from '@mui/joy'

const DatePickerComponent = () => {
    return (
        <>
            <Input
                type="date"
                slotProps={{
                    input: {
                        min: '2018-06-07',
                        max: '2018-06-14',
                    },
                }}
            />
        </>
    )
}

export default DatePickerComponent