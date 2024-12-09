import { Dispatch, FC, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import InputField from "../ui/input-field";
import Button from "../ui/button";
import LoadingBar from "../ui/loading-bar";
import { AppDispatch, RootState } from "../../features/store";
import { loginUser } from "../../features/auth/authSlice";

interface Props {
  setView: Dispatch<SetStateAction<"landing" | "login" | "register">>;
}

const LoginForm: FC<Props> = ({ setView }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    try {
      dispatch(loginUser({ identifier, password }));
    } catch (error) {
      toast.error("Gagal login !");
    }
  };

  return (
    <div className="z-50 flex flex-col max-w-lg gap-4 p-8 bg-white/20 backdrop-blur-md rounded-xl ">
      <LoadingBar loading={loading} />
      <span className="text-xl md:text-4xl tracking-wide md:tracking-[0.5rem] font-jost-semibold text-secondary">
        TRAVEL+
      </span>
      <h1 className="text-4xl md:text-[6rem] font-jost-black text-primary">
        Login
      </h1>
      <p className="tracking-wider md:mt-6 font-jost-regular">
        please login to continue explore more destinations around the world with
        us.
      </p>

      <div className="flex flex-col gap-4">
        <InputField
          type="text"
          label="Email/ Username"
          placeholder="Email/ Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />
        <InputField
          type="password"
          label="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button
        disabed={loading}
        onClick={handleLogin}
        id="masuk"
        title={loading ? "Loading..." : "Masuk"}
        containerClass="mt-4 bg-secondary text-secondary-foreground flex-center gap-2 tracking-wider w-full"
      />

      <p className="text-sm font-outfit-light">
        Belum punya akun?{" "}
        <span
          onClick={() => setView("register")}
          className="cursor-pointer text-secondary"
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
