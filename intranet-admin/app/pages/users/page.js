"use client";

import React from "react";
import "react-toastify/dist/ReactToastify.css";
import CreateUser from "../../components/users/createUser";  
import UpdateUser from "../../components/users/updateUser";  
import DeleteUser from "../../components/users/deleteUser";  

const Users = () => { 
  
    return (
      <div>
        <CreateUser  />
        <UpdateUser />
        <DeleteUser />  
      </div>
  );

}



export default Users;
