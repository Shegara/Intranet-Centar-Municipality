"use client";

import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import CreateUserForm from "../../components/users/createUser";  
import UpdateUserForm from "../../components/users/updateUser";  
import DeleteUserForm from "../../components/users/deleteUser";  

const Users = () => { 
  
    return (
      <div>
        <CreateUserForm />
        <UpdateUserForm />
        <DeleteUserForm />  
      </div>
  );

}



export default Users;
