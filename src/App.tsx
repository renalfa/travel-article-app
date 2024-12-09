import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import Profile from "./pages/Profile";
import Article from "./pages/Article";
import Explore from "./pages/Explore";
import { RootState } from "./features/store";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return user ? children : <Navigate to="/" />;
};

const App = () => (
  <main className="min-h-screen bg-home text-home-foreground">
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <PrivateRoute>
              <Layout>
                <Explore />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/articles"
          element={
            <PrivateRoute>
              <Layout>
                <Article />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/category"
          element={
            <PrivateRoute>
              <Layout>
                <Category />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
    <ToastContainer />
  </main>
);

export default App;
