import PropTypes from "prop-types";
import { Breadcrumbs, Link, Typography } from "@mui/joy";
import { BiHomeAlt } from "react-icons/bi";

BreadcrumbsComponent.propTypes = {
  currentPage: PropTypes.string,
  homePath: PropTypes.string,
  subPage: PropTypes.string,
  subPath: PropTypes.string,
};

function BreadcrumbsComponent({ currentPage, homePath, subPage, subPath }) {
  return (
    <Breadcrumbs sx={{ fontSize: 13, padding: 0 }}>
      <Link color="neutral" href={homePath}>
        <BiHomeAlt />
      </Link>

      {subPage && (
        <Link color="neutral" href={subPath}>
          <Typography fontWeight={500}>{subPage}</Typography>
        </Link>
      )}

      <Typography fontWeight={500}>{currentPage}</Typography>
    </Breadcrumbs>
  );
}

export default BreadcrumbsComponent;
