import { Breadcrumbs, Typography, Link } from "@mui/joy";
import { useNavigate } from "react-router-dom";

const BreadcrumbsComponent = ({
  name,
  pageTitle,
  pagePath,
  subTitle,
  subPath,
}) => {
  const navigate = useNavigate();

  // Handle breadcrumb link clicks
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
      <Breadcrumbs separator={">"} aria-label="breadcrumbs">
        <Typography>{name}</Typography>
        <Link
          color="neutral"
          component={"text"}
          onClick={() => handleNavigate(pagePath)}
        >
          {pageTitle}
        </Link>
        {subTitle && (
          <Link
            color="neutral"
            component="button"
            onClick={() => {
              if(subPath !== ""){
                handleNavigate(subPath)
              }
            }} // Navigate to the specific subpage
          >
            {subTitle}
          </Link>
        )}
      </Breadcrumbs>
    </>
  );
};

export default BreadcrumbsComponent;
