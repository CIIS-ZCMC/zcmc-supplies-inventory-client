import React, { Fragment, useEffect } from "react";
import Header from "../../Layout/Header/Header";
import {user} from "../../Data/index";
const pageDetails = {
    pageTitle: "Saving New Item",
    title: "Inventory",
    description:
      "Save a new item to your inventory, ensuring accurate records and tracking.",
    pagePath: "/inventory",
    subTitle: "New Item",
    subPath: "",
  };
const NewItem = () => {
    return (
        <Fragment>
                <Header pageDetails={pageDetails} data={user} />             
        </Fragment>
    );
};

export default NewItem;