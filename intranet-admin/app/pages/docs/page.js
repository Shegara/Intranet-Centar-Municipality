"use client";

import React from "react";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import CreateDocs from "../../components/docs/createDocs";
import UpdateDocs from "../../components/docs/updateDocs";
import DeleteDocs from "../../components/docs/deleteDocs";

const Docs = () => {
  return (
    <div className="relative">
      <Link href="/" className="absolute top-10 left-10 text-blue-500 flex items-center">
        <span>&#8592;</span>
        <span className="ml-2">Početna stranica</span>
      </Link>
      <CreateDocs />
      <UpdateDocs />
      <DeleteDocs />
    </div>
  );
};

export default Docs;
