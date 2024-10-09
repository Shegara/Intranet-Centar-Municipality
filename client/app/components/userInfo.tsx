import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Image from "next/image";

const DEFAULT_IMAGE_PATH = "/default.png";

interface UserInfoProps {
  firstName: string;
  lastName: string;
  image?: string;
  phoneNum: string;
}

const UserInfo: React.FC<UserInfoProps> = ({
  firstName,
  lastName,
  image,
  phoneNum,
}) => {
  return (
    <div className="col-span-1 flex items-center border-l">
      <div className="w-30 h-30 rounded-lg overflow-hidden mr-4 border-2 border-red-500 hidden sm:block ml-5">
        <Image
          src={image || DEFAULT_IMAGE_PATH}
          alt="Img"
          width={60}
          height={60}
          className="rounded-lg" 
        />
      </div>
      <div>
        <div className="text-base ml-3">{firstName}</div>
        <div className="text-base mt-2 ml-3">{lastName}</div>
        <div className="mt-2 flex items-center ml-3">
          <LocalPhoneIcon className="mr-2" />
          {phoneNum}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
