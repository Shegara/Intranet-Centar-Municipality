"use client";

import React from "react";
import "react-toastify/dist/ReactToastify.css";
import CreateDocs from "../../components/docs/createDocs";  
import UpdateDocs from "../../components/docs/updateDocs";  
import DeleteDocs from "../../components/docs/deleteDocs";  

const Docs = () => { 
  
    return (
      <div>
        <CreateDocs />
        <UpdateDocs />
        <DeleteDocs />  
      </div>
  );

}



export default Docs;
