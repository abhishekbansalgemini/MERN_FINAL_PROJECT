import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Components/Layout/Layout";
import RegisterPage from "./pages/RegisterPage.jsx";
import axios from "axios";
import AccountPage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";
import { UserContextProvider } from "./Context/UserContext";
import "./App.css";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<IndexPage></IndexPage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}>
            {" "}
          </Route>
          <Route
            path="/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
          <Route path="/account" element={<AccountPage></AccountPage>}></Route>
          <Route
            path="/account/places"
            element={<PlacesPage></PlacesPage>}
          ></Route>
          <Route
            path="/account/places/new"
            element={<PlacesFormPage />}
          ></Route>
            <Route
              path="/account/places/:id"
              element={<PlacesFormPage />}
            ></Route>
          <Route path="/place/:id" element={<PlacePage></PlacePage>}></Route>
          <Route path="/account/bookings" element={<BookingsPage />}></Route>
          <Route path="/account/bookings/:id" element={<BookingPage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
