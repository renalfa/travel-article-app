import Sidebar from "./ui/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex bg-home text-home-foreground">
      <Sidebar />
      <div className="relative w-5/6 ml-auto">{children}</div>
    </div>
  );
};

export default Layout;
