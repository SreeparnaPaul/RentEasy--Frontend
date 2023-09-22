import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ListYourProperty from "./Pages/ListYourProperty";
import ShowPropertyDetails from "./Pages/ShowPropertyDetails";
import Review from "./Pages/Review";
import KycVerification from "./Pages/KycVerification";
import RentedProperties from "./Pages/RentedProperties";
import Brokers from "./Pages/Brokers";

function App() {
  return (
    <div className="App app-scroll">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/listProperty" element={<ListYourProperty />} />
          <Route path="/showProperty" element={<ShowPropertyDetails />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/kycVerification" element={<KycVerification />} />
          <Route path="/rentedProperties" element={<RentedProperties />} />
          <Route path="/brokers" element={<Brokers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
