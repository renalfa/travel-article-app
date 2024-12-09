import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/button";
import LoginForm from "../components/landing/LoginForm";
import RegisterForm from "../components/landing/RegisterForm";
import { TiLocationArrow } from "react-icons/ti";
import { RootState } from "../features/store";

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [view, setView] = useState<"landing" | "login" | "register">("landing");

  const renderContent = () => {
    switch (view) {
      case "login":
        return <LoginForm setView={setView} />;
      case "register":
        return <RegisterForm setView={setView} />;
      default:
        return (
          <div className="z-50 flex flex-col gap-4">
            <span className="text-xl md:text-4xl tracking-wide md:tracking-[0.5rem] font-jost-semibold">
              TRAVEL+
            </span>
            <h1 className="text-4xl md:text-[6rem] font-jost-black">WELCOME</h1>
            <p className="tracking-wider md:mt-6 font-jost-regular">
              explore more destinations around the world with us.
            </p>

            <Button
              onClick={() => setView("login")}
              id="explore-now"
              title="Explore Now"
              containerClass="mt-4 bg-secondary text-secondary-foreground flex-center gap-2"
              leftIcon={<TiLocationArrow size={20} />}
            />
          </div>
        );
    }
  };

  useEffect(() => {
    if (user) {
      setView("landing");
      navigate("/explore");
    }
  }, [user]);

  return (
    <div className="p-4 flex-center h-dvh bg-primary text-primary-foreground">
      {renderContent()}
      <div className="overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 object-cover object-center w-full h-full md:video-clip"
          src="/video/hero.mp4"
        />
      </div>
    </div>
  );
};

export default Landing;
