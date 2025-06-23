import { Outlet } from "react-router";
import Navbar from "./app/pages/shared/Navbar/Navbar";
import Footer from "./app/pages/shared/Footer/Footer";
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
    
      <div className="flex-grow">
       <Outlet></Outlet>
      </div>
       <Footer />
    </div>
  );
};

export default App;