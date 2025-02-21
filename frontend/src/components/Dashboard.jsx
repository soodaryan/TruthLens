import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ApexCharts from "apexcharts";
import image from "./images/manImg.png";
import { useAuth } from "../context/authContext";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topData, setTopData] = useState(null);
  const { currentUser } = useAuth();
  const { userLoggedIn } = useAuth();
  const email = currentUser.email;

  useEffect(() => {
        const fetchTopData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/get-top-data?email=${email}`);
  
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
  
                const result = await response.json();
                setTopData(result.data);
                console.log(result.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
  
        fetchTopData();
    }, []);
  useEffect(() => {
    let trendChart, patternChart, sourceChart;


    // Initialize Charts Only If the DOM Elements Exist
    const initializeCharts = () => {
      // Main Trend Analysis Chart
      const trendElement = document.querySelector("#trend-analysis-chart");
      if (trendElement) {
        const trendOptions = {
          chart: {
            type: "area",
            height: 320,
            toolbar: { show: false },
          },
          series: [
            {
              name: "Misinformation Cases",
              data: [31, 40, 28, 51, 42, 109, 70],
            },
          ],
          xaxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          colors: ["#0ea5e9"],
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.3,
            },
          },
        };
        trendChart = new ApexCharts(trendElement, trendOptions);
        trendChart.render();
      }

      // Pattern Chart
      const patternElement = document.querySelector("#pattern-chart");
      if (patternElement) {
        const patternOptions = {
          chart: { type: "donut", height: 256 },
          series: [44, 55, 41, 17],
          labels: ["Social", "News", "Blogs", "Other"],
          colors: ["#0ea5e9", "#22c55e", "#a855f7", "#64748b"],
        };
        patternChart = new ApexCharts(patternElement, patternOptions);
        patternChart.render();
      }

      // Source Chart
      const sourceElement = document.querySelector("#source-chart");
      if (sourceElement) {
        const sourceOptions = {
          chart: { type: "bar", height: 256, toolbar: { show: false } },
          series: [{ data: [44, 55, 41, 64, 22] }],
          colors: ["#0ea5e9"],
          xaxis: {
            categories: ["Twitter", "Facebook", "News", "Blogs", "Other"],
          },
        };
        sourceChart = new ApexCharts(sourceElement, sourceOptions);
        sourceChart.render();
      }
    };

    // Call Initialization
    initializeCharts();

    // Cleanup on Unmount
    return () => {
      if (trendChart) trendChart.destroy();
      if (patternChart) patternChart.destroy();
      if (sourceChart) sourceChart.destroy();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar />

      {/* Mobile Menu Button */}
      <div id="mobile-menu" className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-gray-900 rounded-lg text-white"
        >
          <i className={`fas ${isSidebarOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white flex-1 p-6 ml-60">
        <section
          id="profile_management"
          className="bg-white p-6 space-y-6 element-highlight"
        >
          <div
            className="bg-white grid grid-cols-1 lg:grid-cols-3 gap-6"
            id="el-cg2z4vpn"
          >
            {/* Profile Overview Card */}
            <div
              className="lg:col-span-1 bg-white rounded-lg border border-neutral-300 pt-4 p-6 element-highlight"
              id="el-rfhh6hea"
            >
              <div className="bg-white text-center space-y-4" id="el-ssmu59bz">
                {userLoggedIn ? (
                  <div>
                    <img
                      className="h-24 w-24 rounded-full mx-auto transition-opacity duration-300 opacity-100"
                      src={currentUser.photoURL}
                      alt="Profile"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                    />
                    <div id="el-a5g7ju64">
                      <h3
                        className="text-lg font-medium text-black"
                        id="el-30dimsth"
                      >
                        {currentUser.displayName}
                      </h3>
                      <h3
                        className="text-lg font-medium text-black"
                        id="el-30dimsth"
                      >
                        Email: {currentUser.email}
                      </h3>
                      <p className="text-neutral-700" id="el-safedpgm">
                        Broadcaster ID: TL-117
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <img
                      className="h-24 w-24 rounded-full mx-auto transition-opacity duration-300 opacity-100"
                      src={image}
                      alt="Profile"
                      loading="lazy"
                      id="el-amo17jis"
                    />
                    <div id="el-a5g7ju64">
                      <h3
                        className="text-lg font-medium text-black"
                        id="el-30dimsth"
                      >
                        Authenticoders
                      </h3>
                      <h3
                        className="text-lg font-medium text-black"
                        id="el-30dimsth"
                      >
                        Email: Authentcoder.ai
                      </h3>
                      <p className="text-neutral-700" id="el-safedpgm">
                        Broadcaster ID: TL-117
                      </p>
                    </div>
                  </div>
                )}

                <div
                  className="border-t border-neutral-500 pt-4"
                  id="el-ywuhlho4"
                >
                  <dl className="space-y-4" id="el-ktdr4eew">
                    <div id="el-378ec2rp">
                      <dt className="text-xl text-black" id="el-z9az9u6r">
                        User Details
                      </dt>
                    </div>
                    <div id="el-ykgxehk3">
                      <dt className="text-sm text-neutral-700" id="el-5s8mndto">
                        Location
                      </dt>
                      <dd className="text-black" id="el-kvu81i6a">
                        Delhi, India
                      </dd>
                    </div>
                    <div id="el-004cboiw">
                      <dt className="text-sm text-neutral-700" id="el-jalpjl9j">
                        News Enquired
                      </dt>
                      <dd className="text-black" id="el-zn9s32tb">
                        130
                      </dd>
                    </div>
                    <div id="el-004cboiw">
                      <dt className="text-sm text-neutral-700" id="el-jalpjl9j">
                        News Channel
                      </dt>
                      <dd className="text-black" id="el-zn9s32tb">
                        Aajtak News
                      </dd>
                    </div>
                    <div id="el-004cboiw">
                      <dt className="text-sm text-neutral-700" id="el-jalpjl9j">
                        News Channel ID
                      </dt>
                      <dd className="text-black" id="el-zn9s32tb">
                        AT-130
                      </dd>
                    </div>
                    <div id="el-004cboiw">
                      <dt className="text-sm text-neutral-700" id="el-jalpjl9j">
                        Role
                      </dt>
                      <dd className="text-black" id="el-zn9s32tb">
                        Broadcaster
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            {/* Activity & Claims Section */}
            <div className=" lg:col-span-2 space-y-6" id="el-wa1xx5sb">
              {/* Stats Cards */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                id="el-kk2vaxwv"
              >
                <div
                  className="bg-white rounded-lg border border-neutral-300 p-4"
                  id="el-ukkib61s"
                >
                  <div className="flex items-center" id="el-lmzrv08a">
                    <div
                      className="flex-shrink-0 bg-red-500/10 rounded-lg p-3"
                      id="el-zajbxboa"
                    >
                      <svg
                        className="h-6 w-6 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        id="el-h752fobh"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          id="el-4pbnmqsb"
                        />
                      </svg>
                    </div>
                    <div className="ml-4" id="el-t5dm7zor">
                      <p className="text-sm text-neutral-500" id="el-i2te047a">
                        Fake News Cases
                      </p>
                      <p
                        className="text-2xl font-semibold text-black"
                        id="el-28y7z7g8"
                      >
                        70
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="bg-white rounded-lg border border-neutral-300 p-4"
                  id="el-0pzrawxp"
                >
                  <div className="flex items-center" id="el-s9v57158">
                    <div
                      className="flex-shrink-0 bg-green-500/10 rounded-lg p-3"
                      id="el-gf25ihce"
                    >
                      <svg
                        className="h-6 w-6 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        id="el-0hj1kktu"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          id="el-be9oj5h9"
                        />
                      </svg>
                    </div>
                    <div className="ml-4" id="el-e5oag5pi">
                      <p className="text-sm text-neutral-500" id="el-3rvqnqad">
                        True News Cases
                      </p>
                      <p
                        className="text-2xl font-semibold text-black"
                        id="el-isy743az"
                      >
                        153
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">
                    Fake News Demographics
                  </h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm bg-gray-100 rounded-lg">
                      24h
                    </button>
                    <button className="px-4 py-2 text-sm bg-gray-100 rounded-lg">
                      7d
                    </button>
                    <button className="px-4 py-2 text-sm bg-gray-100 rounded-lg">
                      30d
                    </button>
                  </div>
                </div>
                <div id="trend-analysis-chart" className="h-80"></div>
              </div>
            </div>
          </div>
        </section>
        <section id="claims_dashboard" className="p-6 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200">
            {/* <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">
                  Recent Claims
                </h2>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors">
                    Filter
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    View All
                  </button>
                </div>
              </div>
            </div> */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Claimant
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Confidance Level
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      {topData?.name?.length > 0 ? (
                  topData.name.map((username, index) => {
                    return (
                      <div key={index} className="flex items-center gap-4">
                        {username}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">No username available.</p>
                )}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      Twitter Post
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      2 hr ago{" "}
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-red-300 text-nuetral-500">
                        Fake News
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <span className="text-green-500 text-sm">High</span>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-green-500 h-1.5 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <button className="text-blue-500 hover:text-blue-400">
                        View Details
                      </button>
                    </td>
                  </tr>
                  {/* Additional rows with similar structure but different data */}
                </tbody>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-sm text-gray-900">Sanjay Verma</p>
                          <p className="text-xs text-gray-500">ID: TL-147</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      Aajtak News Article
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      5 hr ago{" "}
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-300 text-nuetral-500">
                        True News
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <span className="text-green-500 text-sm">High</span>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-green-500 h-1.5 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <button className="text-blue-500 hover:text-blue-400">
                        View Details
                      </button>
                    </td>
                  </tr>
                  {/* Additional rows with similar structure but different data */}
                </tbody>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-sm text-gray-900">Kartik Sharma</p>
                          <p className="text-xs text-gray-500">ID: TL-117</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      News Article
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      16 hr ago{" "}
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-red-300 text-nuetral-500">
                        Fake News
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-sm">Medium</span>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-yellow-500 h-1.5 rounded-full"
                            style={{ width: "50%" }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <button className="text-blue-500 hover:text-blue-400">
                        View Details
                      </button>
                    </td>
                  </tr>
                  {/* Additional rows with similar structure but different data */}
                </tbody>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-sm text-gray-900">
                            Gurkeerat Singh
                          </p>
                          <p className="text-xs text-gray-500">ID: TL-101</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      Twitter Post
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      22 hr ago{" "}
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-300 text-nuetral-500">
                        True News
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-sm">Medium</span>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-yellow-500 h-1.5 rounded-full"
                            style={{ width: "50%" }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <button className="text-blue-500 hover:text-blue-400">
                        View Details
                      </button>
                    </td>
                  </tr>
                  {/* Additional rows with similar structure but different data */}
                </tbody>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-sm text-gray-900">Kartik Sharma</p>
                          <p className="text-xs text-gray-500">ID: TL-117</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      Twitter Post
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">
                      2 days ago{" "}
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-red-300 text-nuetral-500">
                        Fake News
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <span className="text-red-500 text-sm">High</span>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-red-500 h-1.5 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <button className="text-blue-500 hover:text-blue-400">
                        View Details
                      </button>
                    </td>
                  </tr>
                  {/* Additional rows with similar structure but different data */}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing 1-5 of 56 claims
                </p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-200">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-200">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
