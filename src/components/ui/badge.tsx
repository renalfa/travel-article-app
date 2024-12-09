import clsx from "clsx";
import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Badge: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "px-4 py-1 rounded-lg w-fit bg-secondary font-outfit-regular text-xs",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Badge;
