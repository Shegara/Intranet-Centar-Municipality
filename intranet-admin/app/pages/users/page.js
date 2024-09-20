"use client";

import React from "react";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import CreateUser from "../../components/users/createUser";  
import UpdateUser from "../../components/users/updateUser";  
import DeleteUser from "../../components/users/deleteUser";  

const Users = () => { 
  
    return (
      <div className="relative">
        <Link href="/" className="absolute top-10 left-10 text-blue-500 flex items-center">
          <span>&#8592;</span>
          <span className="ml-2">Početna stranica</span>
        </Link>
        <CreateUser  />
        <UpdateUser />
        <DeleteUser />  
      </div>
  );

}



export default Users;
