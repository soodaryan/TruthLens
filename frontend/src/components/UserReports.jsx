import React from "react";

const UserReports = () => {
  return (
    <section id="user_reports" className="p-6 ml-60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Reports Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Report Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "New Reports", value: 127, subtitle: "Last 24 hours", icon: "fas fa-flag", color: "primary" },
              { title: "Processing Time", value: "45m", subtitle: "Average response", icon: "fas fa-clock", color: "secondary" },
              { title: "Resolution Rate", value: "94%", subtitle: "Last 7 days", icon: "fas fa-check-circle", color: "accent" },
            ].map((stat, index) => (
              <div key={index} className="bg-white border rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">{stat.title}</h3>
                  <span className={`text-${stat.color}-600`}>
                    <i className={stat.icon}></i>
                  </span>
                </div>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.subtitle}</p>
              </div>
            ))}
          </div>

          {/* Reports Table */}
          <div className="bg-white border rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Latest Reports</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50">Filter</button>
                <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700">Export</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">ID</th>
                    <th className="text-left py-3 px-4 font-semibold">Reporter</th>
                    <th className="text-left py-3 px-4 font-semibold">Category</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Time</th>
                    <th className="text-left py-3 px-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: "#4821",
                      reporter: "John Smith",
                      avatar: "https://avatar.iran.liara.run/public/1",
                      category: "Misinformation",
                      status: "Pending",
                      statusColor: "yellow",
                      time: "5 min ago",
                    },
                    {
                      id: "#4820",
                      reporter: "Sarah Johnson",
                      avatar: "https://avatar.iran.liara.run/public/2",
                      category: "Hate Speech",
                      status: "Resolved",
                      statusColor: "green",
                      time: "10 min ago",
                    },
                  ].map((report, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{report.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <img
                            src={report.avatar}
                            alt="User"
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <span>{report.reporter}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{report.category}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 bg-${report.statusColor}-100 text-${report.statusColor}-800 rounded-full text-xs`}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{report.time}</td>
                      <td className="py-3 px-4">
                        <button className="text-primary-600 hover:text-primary-800">Review</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="lg:col-span-4 space-y-6">
          {/* Report Categories */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-6">Report Categories</h3>
            <div className="space-y-4">
              {[
                { name: "Misinformation", percentage: 45, color: "primary" },
                { name: "Hate Speech", percentage: 30, color: "secondary" },
                { name: "Harassment", percentage: 25, color: "accent" },
              ].map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">{category.name}</span>
                    <span className="text-sm font-medium">{category.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div
                      className={`h-2 bg-${category.color}-500 rounded-full`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Actions */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-6">Recent Actions</h3>
            <div className="space-y-4">
              {[
                {
                  action: "Report #4819 Resolved",
                  time: "2 hours ago",
                  icon: "fas fa-check",
                  color: "primary",
                },
                {
                  action: "Report #4818 Under Review",
                  time: "3 hours ago",
                  icon: "fas fa-clock",
                  color: "yellow",
                },
              ].map((recent, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`w-10 h-10 bg-${recent.color}-100 rounded-full flex items-center justify-center`}
                  >
                    <i className={`${recent.icon} text-${recent.color}-600`}></i>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{recent.action}</p>
                    <p className="text-xs text-gray-500">{recent.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserReports;
