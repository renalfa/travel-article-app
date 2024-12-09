import clsx from "clsx";
import { FC } from "react";

interface Props {
  id: string;
  title: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  containerClass?: string;
  onClick?: () => void;
  disabed?: boolean;
}

const Button: FC<Props> = ({
  id,
  title,
  rightIcon,
  leftIcon,
  containerClass,
  onClick,
  disabed = false,
}) => {
  return (
    <button
      disabled={disabed}
      onClick={onClick}
      id={id}
      className={clsx(
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full disabled:brightness-75 bg-primary px-7 py-3 text-primary-foreground",
        containerClass
      )}
    >
      {leftIcon}

      <span className="relative inline-flex overflow-hidden text-xs uppercase font-jost-semibold">
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>

      {rightIcon}
    </button>
  );
};

export default Button;
