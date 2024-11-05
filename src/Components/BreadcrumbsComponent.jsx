import { Breadcrumbs, Typography, Link } from "@mui/joy"

const BreadcrumbsComponent = ({ name, pageTitle }) => {

    return (
        <>
            <Breadcrumbs separator={">"} aria-label="breadcrumbs">
                <Typography>{name}</Typography>
                <Link color="neutral" component={"text"}>
                    {pageTitle}
                </Link>
            </Breadcrumbs>
        </>
    )
}

export default BreadcrumbsComponent