import { FormLabel, FormControl, Input } from '@mui/joy'

const DatePickerComponent = ({ label, width, placeholder }) => {
    return (
        <>
            <FormControl >
                <FormLabel sx={{ fontSize: 14, fontWeight: 500 }}>{label}</FormLabel>
                <Input
                    sx={{ width: width }}
                    size='lg'
                    type="date"
                    placeholder={placeholder}
                    slotProps={{
                        // input: {
                        //     min: '2018-06-07',
                        //     max: '2018-06-14',
                        // },
                    }}
                />
            </FormControl>

        </>
    )
}

export default DatePickerComponent