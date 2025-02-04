import React, { useState } from "react";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import AccountSettings from "./AccountSettings";
import ChangePhoto from "./ChangePhoto";
import MealPlan from "./MealPlan";
import welcomeImage from "../../assets/imgforprofile/welcome_2.png";

export default function ProfileWelcomePage() {
  const [activeTab, setActiveTab] = useState("welcome");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileView(true);
  };

  const handleBackToMenu = () => {
    setIsMobileView(false);
    setActiveTab("welcome");
  };

  const renderActiveContent = () => {
    if (isMobileView && activeTab === "welcome") {
      // In mobile view, the welcome page is part of the menu.
      return null;
    }

    switch (activeTab) {
      case "account":
        return <AccountSettings />;
      case "changePassword":
        return <ChangePassword />;
      case "deleteAccount":
        return <DeleteAccount />;
      case "changePhoto":
        return (
          <ChangePhoto
            profilePhoto={profilePhoto}
            setProfilePhoto={setProfilePhoto}
          />
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center space-y-6">
            <h1 className="text-4xl font-bold text-orange-50">
              Welcome, username!
            </h1>
            <p className="text-lg text-gray-400 text-center max-w-md">
              Explore the menu on the left to manage your account, update your
              settings, or view your activity.
            </p>
            <div className="w-64 h-64 rounded-full overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105">
              <img
                src={profilePhoto || welcomeImage}
                alt="Welcome"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-10 px-4">
      <div className="flex flex-col md:flex-row w-auto max-w-5xl bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
        {/* Sidebar/Menu */}
        {!isMobileView && (
          <aside className="w-full md:w-1/3 bg-[#11151E] border-r border-gray-700 p-8">
            <div className="flex flex-col items-center mb-10">
              <div className="w-32 h-32 rounded-full bg-orange-50 flex items-center justify-center overflow-hidden shadow-md">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-800 text-sm">No Image</span>
                )}
              </div>
            </div>
            <ul className="space-y-4">
              {[
                {
                  icon: "fas fa-user",
                  label: "Account",
                  action: () => handleTabChange("account"),
                },
                {
                  icon: "fas fa-key",
                  label: "Change Password",
                  action: () => handleTabChange("changePassword"),
                },
                {
                  icon: "fas fa-camera",
                  label: "Change Photo",
                  action: () => handleTabChange("changePhoto"),
                },
                {
                  icon: "fas fa-trash",
                  label: "Delete Account",
                  action: () => handleTabChange("deleteAccount"),
                },
                // Uncomment below if Meal Plan is needed
                // { icon: "fas fa-calendar-alt", label: "Meal Plan", action: () => handleTabChange("mealPlan") },
              ].map((item, index) => (
                <li
                  key={index}
                  onClick={item.action}
                  className="flex items-center p-3 rounded-xl cursor-pointer transition-colors duration-300 text-orange-50 hover:bg-green-500 hover:text-white border border-gray-700 shadow-sm"
                >
                  <i className={`${item.icon} w-6 text-center`} />
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-grow p-10">
          {isMobileView && (
            <button
              onClick={handleBackToMenu}
              className="mb-6 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-md"
            >
              Back to Menu
            </button>
          )}
          {renderActiveContent()}
        </main>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import ChangePassword from "./ChangePassword";
// import PrivacySettings from "./PrivacySettings";
// import AccountSettings from "./AccountSettings";
// import ChangePhoto from "./ChangePhoto";
// import welcomeImage from "../../assets/imgforprofile/welcome.png";
// import MealPlan from "./MealPlan";

// export default function ProfileWelcomePage() {
//   const [activeTab, setActiveTab] = useState("welcome");
//   const [profilePhoto, setProfilePhoto] = useState(null); // Zustand für das Profilfoto
//   const [isMobileView, setIsMobileView] = useState(false);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setIsMobileView(true); // Wechsel in mobilen Modus
//   };

//   const handleBackToMenu = () => {
//     setIsMobileView(false); // Zurück zum Menü
//     setActiveTab("welcome"); // Zurücksetzen des aktiven Tabs für die mobile Ansicht
//   };

//   const renderActiveContent = () => {
//     switch (activeTab) {
//       case "account":
//         return <AccountSettings />;
//       case "changePassword":
//         return <ChangePassword />;
//       case "privacy":
//         return <PrivacySettings />;
//       case "changePhoto":
//         return <ChangePhoto profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} />;
//       case "mealPlan":
//         return <MealPlan />;
//       default:
//         return (
//           <div className="text-center">
//             <h1 className="text-3xl font-semibold text-gray-800 mt-5 mb-6">Welcome</h1>
//             <p className="text-gray-800 text-sm">
//               Explore the menu on the left to manage your account, update settings, or view activity.
//             </p>
//             <div className="w-60 h-60 rounded-full overflow-hidden flex items-center justify-center mb-2">
//               <img
//                 src={profilePhoto || welcomeImage}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div
//       id="custom-container"
//       className="min-h-screen flex items-center justify-center font-sans mt-0 md:mt-[-40px]"
//     >
//       <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md w-full max-w-4xl">
//         {!isMobileView && (
//           <div className="w-full md:w-1/4 bg-gray-50 border-r p-4">
//             <div className="flex flex-col items-center">
//               <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center mb-2">
//                 {profilePhoto ? (
//                   <img
//                     src={profilePhoto}
//                     alt="Profile"
//                     className="w-full h-full rounded-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-gray-500">No Image</span>
//                 )}
//               </div>
//               <h2 className="text-sm font-semibold text-gray-800">Name</h2>
//             </div>
//             <ul className="mt-6 space-y-3">
//               {[
//                 { icon: "fas fa-user", label: "Account", action: () => handleTabChange("account") },
//                 { icon: "fas fa-key", label: "Change password", action: () => handleTabChange("changePassword") },
//                 { icon: "fas fa-lock", label: "Privacy", action: () => handleTabChange("privacy") },
//                 { icon: "fas fa-camera", label: "Change photo", action: () => handleTabChange("changePhoto") },
//                 { icon: "fas fa-calendar-alt", label: "Meal plan", action: () => handleTabChange("mealPlan") },
//               ].map((item, index) => (
//                 <li
//                   key={index}
//                   className="w-full flex items-center border border-gray-200 rounded-full p-2 hover:bg-green-500 hover:text-white rounded-l-full transition duration-300 cursor-pointer"
//                   onClick={item.action}
//                 >
//                   <div className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-white">
//                     <i className={item.icon}></i>
//                   </div>
//                   <div className="ml-2 text-sm text-gray-600 hover:text-white">{item.label}</div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         <div className="flex-grow p-6">
//           {isMobileView ? (
//             <div>
//               <button
//                 onClick={handleBackToMenu}
//                 className="mb-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
//               >
//                 Back to Menu
//               </button>
//               {renderActiveContent()}
//             </div>
//           ) : (
//             renderActiveContent()
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import ChangePassword from "./ChangePassword";
// import PrivacySettings from "./PrivacySettings";
// import AccountSettings from "./AccountSettings";
// import ChangePhoto from "./ChangePhoto";
// import welcomeImage from "../../assets/imgforprofile/welcome.png";
// import MealPlan from "./MealPlan";

// export default function ProfileWelcomePage() {
//   const [activeTab, setActiveTab] = useState("welcome");
//   const [profilePhoto, setProfilePhoto] = useState(null); // Zustand für das Profilfoto
//   const [isMobileView, setIsMobileView] = useState(false);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setIsMobileView(true); // Wechsel in mobilen Modus
//   };

//   const handleBackToMenu = () => {
//     setIsMobileView(false); // Zurück zum Menü
//   };

//   const renderActiveContent = () => {
//     switch (activeTab) {
//       case "account":
//         return <AccountSettings />;
//       case "changePassword":
//         return <ChangePassword />;
//       case "privacy":
//         return <PrivacySettings />;
//       case "changePhoto":
//         return <ChangePhoto profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto} />;
//       case "mealPlan":
//         return <MealPlan />;
//       default:
//         return (
//           <div className="text-center">
//             <h1 className="text-3xl font-semibold text-gray-800 mt-5 mb-6">Welcome</h1>
//             <p className="text-gray-800 text-sm">
//               Explore the menu on the left to manage your account, update settings, or view activity.
//             </p>
//             <div className="w-60 h-60 rounded-full overflow-hidden flex items-center justify-center mb-2">
//               <img
//                 src={profilePhoto || welcomeImage}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div
//       id="custom-container"
//       className="min-h-screen flex items-center justify-center font-sans mt-0 md:mt-[-40px]"
//     >
//       <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md w-full max-w-4xl">
//         {!isMobileView && (
//           <div className="w-full md:w-1/4 bg-gray-50 border-r p-4">
//             <div className="flex flex-col items-center">
//               <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center mb-2">
//                 {profilePhoto ? (
//                   <img
//                     src={profilePhoto}
//                     alt="Profile"
//                     className="w-full h-full rounded-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-gray-500">No Image</span>
//                 )}
//               </div>
//               <h2 className="text-sm font-semibold text-gray-800">Name</h2>
//             </div>
//             <ul className="mt-6 space-y-3">
//               {[
//                 { icon: "fas fa-user", label: "Account", action: () => handleTabChange("account") },
//                 { icon: "fas fa-key", label: "Change password", action: () => handleTabChange("changePassword") },
//                 { icon: "fas fa-lock", label: "Privacy", action: () => handleTabChange("privacy") },
//                 { icon: "fas fa-camera", label: "Change photo", action: () => handleTabChange("changePhoto") },
//                 // { icon: "fas fa-bell", label: "My Recipe", action: () => handleTabChange("myRecipe") },
//                 { icon: "fas fa-calendar-alt", label: "Meal plan", action: () => handleTabChange("mealPlan") },
//               ].map((item, index) => (
//                 <li
//                   key={index}
//                   className="w-full flex items-center border border-gray-200 rounded-full p-2 hover:bg-green-500 hover:text-white rounded-l-full transition duration-300 cursor-pointer"
//                   onClick={item.action}
//                 >
//                   <div className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-white">
//                     <i className={item.icon}></i>
//                   </div>
//                   <div className="ml-2 text-sm text-gray-600 hover:text-white">{item.label}</div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         <div className="flex-grow p-6">
//           {isMobileView ? (
//             <div>
//               <button
//                 onClick={handleBackToMenu}
//                 className="mb-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
//               >
//                 Back to Menu
//               </button>
//               {renderActiveContent()}
//             </div>
//           ) : (
//             renderActiveContent()
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }