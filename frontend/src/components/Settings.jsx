import React from 'react';
import Sidebar from './Sidebar';
import { useAuth } from "../context/authContext";

const Settings = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Sidebar />
      <section id="settings" className="p-6 ml-60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Settings Area */}
          <div className="lg:col-span-8">
            {/* Account Settings */}
            <div className="bg-white border rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Account Settings</h3>
                <button className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Save Changes
                </button>
              </div>

              <div className="space-y-6">
                {/* Profile Info */}
                <div className="flex space-x-4 pb-6 border-b">
                  <img
                    className="h-24 rounded-full mx-auto transition-opacity duration-300 opacity-100"
                    src={currentUser.photoURL}
                    alt="Profile"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                  />
                  <div>
                    <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                      Change Photo
                    </button>
                    <p className="mt-2 text-sm text-gray-500">
                      Recommended: Square image, at least 400x400px
                    </p>
                  </div>
                </div>

                {/* Personal Info Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg text-black"
                      placeholder="Full Name"
                      defaultValue={currentUser.displayName}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-lg text-black"
                      placeholder="Email Address"
                      defaultValue={currentUser.email}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Broadcaster</option>
                      <option>Administrator</option>
                      <option>Moderator</option>
                      <option>Analyst</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Zone
                    </label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>IST</option>
                      <option>UTC-8 (Pacific Time)</option>
                      <option>UTC-5 (Eastern Time)</option>
                      <option>UTC+0 (GMT)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white border rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-6">
                Notification Settings
              </h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">
                      Receive daily summary and alerts
                    </p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input type="checkbox" className="peer sr-only" checked />
                    <div className="w-11 h-6 bg-gray-200 peer-checked:bg-primary-600 rounded-full"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-6"></div>
                  </div>
                </label>

                <label className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Desktop Notifications</p>
                    <p className="text-sm text-gray-500">
                      Show alerts in browser
                    </p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input type="checkbox" className="peer sr-only" checked />
                    <div className="w-11 h-6 bg-gray-200 peer-checked:bg-primary-600 rounded-full"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-6"></div>
                  </div>
                </label>

                <label className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Weekly Reports</p>
                    <p className="text-sm text-gray-500">
                      Receive weekly analysis reports
                    </p>
                  </div>
                  <div className="relative inline-block w-12 h-6">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-11 h-6 bg-gray-200 peer-checked:bg-primary-600 rounded-full"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-6"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-4 space-y-6">
            {/* Security Settings */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Security</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <i className="fas fa-key text-primary-600 mr-3"></i>
                    <span>Change Password</span>
                  </div>
                  <i className="fas fa-chevron-right text-gray-400"></i>
                </button>
                <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <i className="fas fa-shield-alt text-primary-600 mr-3"></i>
                    <span>Two-Factor Auth</span>
                  </div>
                  <i className="fas fa-chevron-right text-gray-400"></i>
                </button>
                <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <i className="fas fa-history text-primary-600 mr-3"></i>
                    <span>Login History</span>
                  </div>
                  <i className="fas fa-chevron-right text-gray-400"></i>
                </button>
              </div>
            </div>

            {/* System Settings */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">System</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">System Version</p>
                    <p className="text-xs text-gray-500">v2.1.0</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Up to date
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Last Backup</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-800">
                    <i className="fas fa-sync-alt"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-600 mb-4">
                Danger Zone
              </h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-3 border border-red-200 rounded-lg hover:bg-red-50">
                  <div className="flex items-center">
                    <i className="fas fa-trash text-red-600 mr-3"></i>
                    <span className="text-red-600">Delete Account</span>
                  </div>
                  <i className="fas fa-chevron-right text-red-400"></i>
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Settings;
