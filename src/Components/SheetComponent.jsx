import { Sheet } from "@mui/joy"

const SheetComponent = ({ variant, children }) => {

    const sheetStyles = {
        borderRadius: '20px',
        padding: '1rem'
    }

    return (
        <>
            <Sheet
                sx={{ ...sheetStyles }}
                variant={variant}>
                {children}
            </Sheet>
        </>
    )
}

export default SheetComponent