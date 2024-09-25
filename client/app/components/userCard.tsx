import React from "react";
import UserInfo from "./userInfo";

interface UserCardProps {
  id: number;
  firstName: string;
  lastName: string;
  image?: string;
  service: string;
  rank: string;
  mail: string;
  floor: string;
  officeNum: string;
  phoneNum: string;
  getNameClass: (firstName: string, lastName: string) => string;
  getEmailClass: (mail: string) => string;
}

const UserCard: React.FC<UserCardProps> = ({
  id,
  firstName,
  lastName,
  image,
  service,
  rank,
  mail,
  floor,
  officeNum,
  phoneNum,
  getNameClass,
  getEmailClass,
}) => {
  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-md">
      <div className="grid grid-cols-4 gap-4">
        <UserInfo
          firstName={firstName}
          lastName={lastName}
          image={image}
          phoneNum={phoneNum}
          getNameClass={getNameClass}
        />
        <div className="col-span-2 border-l border-gray-300 pl-4 flex flex-col justify-center">
          <div>
            <strong>Služba:</strong> {service}
          </div>
          <div className="mt-4">
            <strong>Pozicija:</strong> {rank}
          </div>
          <div className="mt-4">
            <strong>Email:</strong>{" "}
            <span className={getEmailClass(mail)}>
              {mail}
            </span>
          </div>
        </div>
        <div className="border-l border-gray-300 pl-4 flex flex-col items-center justify-center">
          <div>
            <strong>ID:</strong> {id}
          </div>
          <div className="mt-2">
            <strong>Sprat:</strong> {floor}
          </div>
          <div className="mt-2">
            <strong>Broj Ureda:</strong> {officeNum}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
