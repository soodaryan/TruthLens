import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <nav
        id="sidebar"
        className={`fixed h-screen w-64 bg-gray-900 text-white flex flex-col shadow-lg transition-transform duration-300 transform z-50 ${
          isSidebarOpen ? '' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex items-center border-b border-gray-800">
          <img
            src="https://placehold.co/40x40?text=M"
            alt="Logo"
            className="w-10 h-10 rounded"
          />
          <span className="ml-3 text-xl font-semibold">Misinform</span>
        </div>

        <div className="flex-1 py-4 ">
          {[
            { href: '#overview', icon: 'fas fa-chart-line', label: 'Overview' },
            { href: '#content', icon: 'fas fa-file-alt', label: 'Content' },
            { href: '#reports', icon: 'fas fa-flag', label: 'Reports' },
            { href: '#trends', icon: 'fas fa-chart-bar', label: 'Trends' },
            { href: '#insights', icon: 'fas fa-brain', label: 'Insights' },
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 transition-colors"
            >
              <i className={`${item.icon} w-5`}></i>
              <span className="ml-3">{item.label}</span>
            </a>
          ))}
        </div>

        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center">
            <img
              src="https://avatar.iran.liara.run/public"
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">admin@misinform.ai</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div id="mobile-menu" className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-gray-900 rounded-lg text-white"
        >
          <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Main Content */}
      <main
        className={`flex-1 ${isSidebarOpen ? 'ml-64' : ''} bg-gray-50 overflow-y-auto`}
      >
        <div className="sticky top-0 bg-white border-b z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                />
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <i className="fas fa-bell"></i>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <i className="fas fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        {/* Replace this with your content */}
        <div className="p-6">Main Content Goes Here</div>
      </main>
    </div>
  );
};

export default Dashboard;
