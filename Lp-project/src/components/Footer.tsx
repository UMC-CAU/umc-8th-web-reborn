import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black py-6 text-gray-400 border-t border-white">
      <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} SpinningSpinning Dolimpan. All
          rights reserved.
        </p>
        <div className={"flex justify-center space-x-4 mt-4"}>
          <Link to={"#"} className="hover:text-red-500">
            Privacy Policy
          </Link>
          <Link to={"#"} className="hover:text-red-500">
            Terms of Service
          </Link>
          <Link to={"#"} className="hover:text-red-500">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
