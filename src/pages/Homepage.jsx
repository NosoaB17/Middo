import Hero from "../components/Homepage/Hero";
import Solution from "../components/Homepage/Solution";
import AboutUs from "../components/Homepage/AboutUs";
// import UserGuide from "../components/Homepage/UserGuide";
import CallToAction from "../components/Homepage/CallToAction";
import Footer from "../components/Homepage/Footer";

const HomePage = () => {
  return (
    <div className="relative overflow-x-hidden">
      <Hero />
      <Solution />
      <AboutUs />
      {/* <UserGuide /> */}
      <CallToAction />
      <Footer />
    </div>
  );
};

export default HomePage;
