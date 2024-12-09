import { FC } from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../../lib/formater";
import { RootState } from "../../features/store";

const ProfileSection: FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col justify-between p-8 border md:items-center md:flex-row rounded-xl bg-primary/5">
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl tracking-wider text-center md:text-left font-outfit-bold">
          My Profile
        </h2>
        <div className="flex flex-col gap-4 md:items-center md:flex-row">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.user?.username}&background=random`}
            alt={user?.user?.username}
            className="mx-auto rounded-full size-36 md:size-16 md:mx-0"
          />
          <div className="text-center md:text-left">
            <p className="text-2xl font-outfit-semibold">
              {user?.user?.username}
            </p>
            <p className="text-lg font-outfit-regular">{user?.user?.email}</p>
          </div>
        </div>
      </div>
      <div className="text-center md:text-left">
        <p className="text-xs font-outfit-light">bergabung sejak</p>
        <span className="text-sm font-outfit-bold">
          {" "}
          {formatDate(user?.user?.createdAt as string)}
        </span>
      </div>
    </div>
  );
};

export default ProfileSection;
