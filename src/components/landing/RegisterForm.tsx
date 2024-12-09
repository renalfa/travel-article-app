import { Dispatch, FC, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import InputField from "../ui/input-field";
import Button from "../ui/button";
import LoadingBar from "../ui/loading-bar";
import { AppDispatch, RootState } from "../../features/store";
import { registerUser } from "../../features/auth/authSlice";

interface Props {
  setView: Dispatch<SetStateAction<"landing" | "login" | "register">>;
}

const RegisterForm: FC<Props> = ({ setView }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = () => {
    try {
      dispatch(registerUser({ username, email, password }));
    } catch (error) {
      toast.error("Gagal register !");
    }
  };

  return (
    <div className="z-50 flex flex-col max-w-lg gap-4 p-8 bg-white/20 backdrop-blur-md rounded-xl ">
      <LoadingBar loading={loading} />
      <span className="text-xl md:text-4xl tracking-wide md:tracking-[0.5rem] font-jost-semibold text-secondary">
        TRAVEL+
      </span>
      <h1 className="text-4xl md:text-[6rem] font-jost-black text-primary">
        Register
      </h1>
      <p className="tracking-wider md:mt-6 font-jost-regular">
        lets register to continue explore more destinations around the world
        with us.
      </p>

      <div className="flex flex-col gap-4">
        <InputField
          type="text"
          label="Username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="email"
          label="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        onClick={handleRegister}
        id="daftar"
        title={loading ? "Loading..." : "Daftar"}
        containerClass="mt-4 bg-secondary text-secondary-foreground flex-center gap-2 tracking-wider w-full"
      />

      <p className="text-sm font-outfit-light">
        Sudah punya akun?{" "}
        <span
          onClick={() => setView("login")}
          className="cursor-pointer text-secondary"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;
