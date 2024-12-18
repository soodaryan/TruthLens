import React from "react";

const ModerationQueue = () => {
  return (
    <section className="p-6 ml-60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Queue Area */}
        <div className="lg:col-span-8">
          <div className="bg-white border rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Moderation Queue</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
                  Filter
                </button>
                <button className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Assign
                </button>
              </div>
            </div>

            {/* Queue Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Pending", value: 45, color: "orange-500", icon: "fas fa-clock" },
                { label: "In Progress", value: 23, color: "blue-500", icon: "fas fa-spinner" },
                { label: "Completed", value: 167, color: "green-500", icon: "fas fa-check" },
                { label: "Escalated", value: 12, color: "red-500", icon: "fas fa-exclamation-triangle" },
              ].map((stat, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{stat.label}</span>
                    <span className={`text-${stat.color}`}>
                      <i className={stat.icon}></i>
                    </span>
                  </div>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Queue Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    {["ID", "Content", "Type", "Priority", "Assigned To", "Status", "Action"].map((header, index) => (
                      <th key={index} className="text-left py-3 px-4">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: "#5123",
                      content: "Political News Article",
                      type: "Article",
                      priority: "High",
                      priorityColor: "red",
                      assignedTo: "Alex Morgan",
                      avatar: "https://avatar.iran.liara.run/public/3",
                      status: "In Progress",
                      statusColor: "blue",
                    },
                    {
                      id: "#5122",
                      content: "Viral Social Media Post",
                      type: "Image",
                      priority: "Medium",
                      priorityColor: "yellow",
                      assignedTo: "Sarah Chen",
                      avatar: "https://avatar.iran.liara.run/public/4",
                      status: "Pending",
                      statusColor: "orange",
                    },
                  ].map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{item.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <i className="fas fa-newspaper text-gray-400 mr-2"></i>
                          <span className="text-sm">{item.content}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{item.type}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 bg-${item.priorityColor}-100 text-${item.priorityColor}-800 rounded-full text-xs`}
                        >
                          {item.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <img src={item.avatar} alt="Moderator" className="w-6 h-6 rounded-full mr-2" />
                          <span className="text-sm">{item.assignedTo}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 bg-${item.statusColor}-100 text-${item.statusColor}-800 rounded-full text-xs`}
                        >
                          {item.status}
                        </span>
                      </td>
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
          {/* Moderator Status */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Active Moderators</h3>
            {[
              {
                name: "Alex Morgan",
                progress: 5,
                avatar: "https://avatar.iran.liara.run/public/5",
              },
              {
                name: "Sarah Chen",
                progress: 3,
                avatar: "https://avatar.iran.liara.run/public/6",
              },
            ].map((mod, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <img src={mod.avatar} alt="Moderator" className="w-8 h-8 rounded-full" />
                  <div className="ml-3">
                    <p className="text-sm font-medium">{mod.name}</p>
                    <p className="text-xs text-gray-500">{mod.progress} items in progress</p>
                  </div>
                </div>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
            ))}
          </div>

          {/* Queue Analytics */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Queue Analytics</h3>
            {[
              { label: "Response Time", value: "15 min avg", percentage: 85, color: "primary" },
              { label: "Completion Rate", value: "92%", percentage: 92, color: "secondary" },
              { label: "Accuracy", value: "97%", percentage: 97, color: "accent" },
            ].map((analytic, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{analytic.label}</span>
                  <span className="text-sm font-medium">{analytic.value}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-2 bg-${analytic.color}-600 rounded-full`}
                    style={{ width: `${analytic.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModerationQueue;
