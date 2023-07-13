import playStoreLogo from "../assets/images/playstore.png"
import appStoreLogo from "../assets/images/appstore.png"

const Footer = () => {
  return (
    <div className=" bg-gray-900">
      <div className="max-w-2xl mx-auto text-white py-10">
        <div className="text-center">
          <h3 className="text-3xl mb-3"> Get our app now </h3>
          <p> Fuel Your Mind with Endless Stories at Our Bookstore</p>
          <div className="flex justify-center my-10">
            <div className="flex items-center border w-auto rounded-lg px-4 py-2 mx-2 hover:scale-110 duration-200 cursor-pointer">
              <img
                src={playStoreLogo}
                className="w-7 md:w-8"
              />
              <div className="text-left ml-3">
                <p className="text-xs text-gray-200">Download on </p>
                <p className="text-sm md:text-base"> Google Play Store </p>
              </div>
            </div>
            <div className="flex items-center border w-auto rounded-lg px-4 py-2 mx-2 hover:scale-110 duration-200 cursor-pointer">
              <img
                src={appStoreLogo}
                className="w-7 md:w-8"
              />
              <div className="text-left ml-3">
                <p className="text-xs text-gray-200">Download on </p>
                <p className="text-sm md:text-base"> Apple Store </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
          <p className="order-2 md:order-1 mt-8 md:mt-0">
            &copy; Book Catalog, 2023.
          </p>
          <div className="order-1 md:order-2">
            <span className="px-2 cursor-pointer">About us</span>
            <span className="px-2 border-l cursor-pointer">Contact us</span>
            <span className="px-2 border-l cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
