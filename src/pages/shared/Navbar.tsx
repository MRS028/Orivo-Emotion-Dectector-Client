import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/Hooks/useAuth";
import Swal from "sweetalert2";
import Logo from "@/assets/logo";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth(); // User authentication state
  const navigate = useNavigate();

  const guestLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const userLinks = [
    { name: "Detect Emotion", href: "/text-response" },
    { name: "Profile", href: "/profile" },
    { name: "History", href: "/history" },
  ];

  // ✅ SweetAlert logout
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      logOut();
      Swal.fire({
        icon: "success",
        title: "Logged out",
        text: "You have been logged out successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/"); // redirect after logout
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-indigo-600 inline-block">
          <div className="flex items-center ">
            <Logo />  Orivo
          </div>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {(user ? userLinks : guestLinks).map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) => 
                `transition-colors font-medium ${
                  isActive 
                    ? "text-indigo-600" 
                    : "text-gray-700 hover:text-indigo-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {user ? (
            <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white rounded-full"
            >
              Logout
            </Button>
          ) : (
            <NavLink to="/signup">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full rounded-full">
                Get Started
              </Button>
            </NavLink>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="flex flex-col space-y-3 p-4">
            {(user ? userLinks : guestLinks).map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) => 
                  `transition-colors font-medium ${
                    isActive 
                      ? "text-indigo-600" 
                      : "text-gray-700 hover:text-indigo-600"
                  }`
                }
                onClick={() => setIsOpen(false)} // close menu on link click
              >
                {link.name}
              </NavLink>
            ))}

            {user ? (
              <Button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white w-full rounded-full"
              >
                Logout
              </Button>
            ) : (
              <NavLink to="/signup">
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white w-full rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Button>
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;