import React, { useState, useEffect } from "react";
import Header from "../Components/Header";

const Setting = () => {
  const [isCalendarLinked, setIsCalendarLinked] = useState(false);
  const [isEmailLinked, setIsEmailLinked] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Profile state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setName(savedUser.name || "John Doe");
      setEmail(savedUser.email || "johndoe@example.com");
    }
  }, []);

  const handleSaveProfile = () => {
    setIsEditing(false);
    localStorage.setItem("user", JSON.stringify({ name, email }));
    alert("Profile updated successfully!");
  };

  const handleLinkCalendar = () => {
    alert("Calendar link status updated!");
    setIsCalendarLinked(!isCalendarLinked);
  };

  const handleLinkEmail = () => {
    alert("Email link status updated!");
    setIsEmailLinked(!isEmailLinked);
  };

  const handleToggleNotifications = () => {
    setIsNotificationsEnabled(!isNotificationsEnabled);
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSocialLink = (platform) => {
    alert(`${platform} account linked!`);
  };

  return (
    <>
      <Header />
      <div
        className={`flex flex-col items-center min-h-[90vh] pt-15 ${
          isDarkMode ? "bg-[#0f172a] text-white" : "bg-gray-100 text-gray-900"
        } font-sans antialiased p-6 transition-colors duration-500`}
      >
        <div className="w-full max-w-2xl p-8 bg-gray-900 bg-opacity-70 backdrop-blur-lg rounded-3xl border border-gray-700 shadow-2xl transition-all duration-300 transform hover:shadow-purple-500/50">
          <h1 className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-400">
            User Settings
          </h1>

          {/* Profile Section */}
          <div className="mb-10 p-6 bg-gray-800 bg-opacity-50 rounded-2xl border border-gray-700 shadow-inner">
            <h2 className="text-2xl font-bold text-teal-300 mb-4">Profile</h2>
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500 shadow-lg">
                <svg
                  className="w-full h-full text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-3.007l12-12 12 12zM12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zM12 4a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-800 to-transparent opacity-60"></div>
              </div>

              {/* Editable Fields */}
              <div className="text-center md:text-left flex-grow">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-white">{name}</h3>
                    <p className="text-sm text-gray-400">{email}</p>
                  </>
                )}
              </div>

              {/* Button Toggle */}
              {isEditing ? (
                <button
                  onClick={handleSaveProfile}
                  className="py-2 px-6 rounded-full bg-green-600 hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="py-2 px-6 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Theme Preferences */}
          <div className="space-y-6 mb-10">
            <h2 className="text-2xl font-bold text-teal-300 mb-4">Theme</h2>
            <div className="flex justify-between items-center p-4 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 shadow-inner">
              <span className="text-lg font-medium">Dark Mode</span>
              <div
                onClick={handleToggleTheme}
                className={`relative inline-block w-14 h-8 rounded-full cursor-pointer transition-colors duration-300 ${
                  isDarkMode ? "bg-purple-600" : "bg-gray-600"
                }`}
              >
                <div
                  className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    isDarkMode ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </div>
          </div>

          {/* Integration Section */}
          <div className="space-y-6 mb-10">
            <h2 className="text-2xl font-bold text-teal-300 mb-4">
              Integrations
            </h2>
            <div className="flex flex-col space-y-4">
              {/* Calendar Integration */}
              <div className="flex justify-between items-center p-4 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 shadow-inner">
                <span className="text-lg font-medium">
                  Link Google Calendar
                </span>
                <button
                  onClick={handleLinkCalendar}
                  className={`py-2 px-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isCalendarLinked
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isCalendarLinked ? "Unlink" : "Link"}
                </button>
              </div>

              {/* Email Integration */}
              <div className="flex justify-between items-center p-4 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 shadow-inner">
                <span className="text-lg font-medium">Link Email Service</span>
                <button
                  onClick={handleLinkEmail}
                  className={`py-2 px-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isEmailLinked
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isEmailLinked ? "Unlink" : "Link"}
                </button>
              </div>

              {/* Social Media Integration */}
              <div className="flex justify-between items-center p-4 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 shadow-inner">
                <span className="text-lg font-medium">Link Social Media</span>
                <button
                  onClick={() => handleSocialLink("Twitter")}
                  className="py-2 px-6 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105"
                >
                  Link
                </button>
              </div>
            </div>
          </div>

          {/* Notifications and Privacy */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-teal-300 mb-4">
              Privacy & Notifications
            </h2>
            <div className="flex flex-col space-y-4">
              {/* Notifications */}
              <div className="flex justify-between items-center p-4 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 shadow-inner">
                <span className="text-lg font-medium">
                  Enable Notifications
                </span>
                <div
                  onClick={handleToggleNotifications}
                  className={`relative inline-block w-14 h-8 rounded-full cursor-pointer transition-colors duration-300 ${
                    isNotificationsEnabled ? "bg-purple-600" : "bg-gray-600"
                  }`}
                >
                  <div
                    className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                      isNotificationsEnabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Account Deletion */}
              <div className="flex justify-between items-center p-4 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 shadow-inner">
                <span className="text-lg font-medium text-red-400">
                  Delete Account
                </span>
                <button className="py-2 px-6 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-300 transform hover:scale-105">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
