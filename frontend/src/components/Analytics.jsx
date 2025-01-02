import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { useRef } from 'react';
import Sidebar from './Sidebar';
const Analytics = () => {
  const trendChartRef = useRef(null);

  useEffect(() => {
    const patternOptions = {
      chart: {
        type: "donut",
        height: 256,
      },
      series: [44, 55, 41, 17, 23],
      labels: ["False Information", "Correct Information", "Hate Speech", "Sensitive Content", "Clickbait"],
      colors: ["#0ea5e9", "#22c55e", "#a855f7", "#64748b", "#f59e0b"],
    };

    const sourceOptions = {
      chart: {
        type: "bar",
        height: 256,
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          data: [44, 55, 41, 64, 22],
        },
      ],
      colors: ["#0ea5e9"],
      xaxis: {
        categories: ["DD News", "Hindustan Times ", "Google News", "Fact Check API ", "Other"],
      },
    };

    let patternChart, sourceChart;
    
    const options = {
      chart: {
        type: 'area',
        height: 288,
        fontFamily: 'Inter, sans-serif',
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: 'Reports',
          data: [30, 40, 35, 50, 49, 60, 70],
        },
      ],
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisBorder: {
          show: false,
        },
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      colors: ['#0ea5e9'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
    };

    const chart = new ApexCharts(trendChartRef.current, options);
    chart.render();
    try {
      patternChart = new ApexCharts(
        document.querySelector("#pattern-chart"),
        patternOptions
      );
      patternChart.render();

    } catch (error) {
      console.error("Error initializing charts:", error);
    }

    return () => {
      chart.destroy();
      patternChart.destroy();
    };
  }, []);

  return (
    <>
      <Sidebar />
      <section className="p-6 ml-60">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Total News Reports</h3>
              <span className="text-white"><i className="fas fa-flag"></i></span>
            </div>
            <p className="text-3xl font-bold">2,547</p>
            <p className="text-sm opacity-80 mt-2">+15.3% from last month</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Verified Cases</h3>
              <span className="text-white"><i className="fas fa-check-circle"></i></span>
            </div>
            <p className="text-3xl font-bold">1,623</p>
            <p className="text-sm opacity-80 mt-2">+5.7% from last month</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">False cases</h3>
              <span className="text-white"><i className="fas fa-clock"></i></span>
            </div>
            <p className="text-3xl font-bold">811</p>
            <p className="text-sm opacity-80 mt-2">-5.3% from last month</p>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Unverified Cases</h3>
              <span className="text-white"><i className="fas fa-link"></i></span>
            </div>
            <p className="text-3xl font-bold">113</p>
            <p className="text-sm opacity-80 mt-2">-1.4% from last month</p>
          </div>


        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 p-6 bg-white border rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-700">Misinformation Trends</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-gray-100 rounded-full">Daily</button>
                <button className="px-3 py-1 text-sm bg-primary-50 text-primary-600 rounded-full">Weekly</button>
                <button className="px-3 py-1 text-sm bg-gray-100 rounded-full">Monthly</button>
              </div>
            </div>
            <div ref={trendChartRef} className="h-72"></div>
          </div>

          <div className="p-6 bg-white border rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-6">Top Categories</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Politics</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <div className="w-200 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>

                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Health</span>
                    <span className="text-sm font-medium">32%</span>
                  </div>
                  <div className="w-200 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-red-500 h-1.5 rounded-full"
                      style={{ width: "32%" }}
                    ></div>
                  </div>

                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Technology</span>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                  <div className="w-200 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-yellow-500 h-1.5 rounded-full"
                      style={{ width: "40%" }}
                    ></div>
                  </div>

                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Finance</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <div className="w-200 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>

                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Cricket</span>
                    <span className="text-sm font-medium">50%</span>
                  </div>
                  <div className="w-200 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-yellow-500 h-1.5 rounded-full"
                      style={{ width: "50%" }}
                    ></div>
                  </div>

                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Education</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="w-200 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-red-500 h-1.5 rounded-full"
                      style={{ width: "15%" }}
                    ></div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div>

        </div>
        <div className="grid grid-cols-2 gap-6">

          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
              <button className="text-sm text-primary-600 hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex-shrink-0 bg-blue-500/10 rounded-lg p-3">
                  <svg
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-800">New report submitted</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex-shrink-0 bg-green-500/10 rounded-lg p-3">
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2l4-4m0 0l4-4m-8 8l4-4M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-800">Source verified</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Top Trending Topics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    1
                  </span>
                  <span className="ml-3">#Terroristattack</span>
                </div>
                <span className="text-sm text-gray-500">12.3K posts</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    2
                  </span>
                  <span className="ml-3">New Orleans</span>
                </div>
                <span className="text-sm text-gray-500">778K posts</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    3
                  </span>
                  <span className="ml-3">Hindu Nav Varsh</span>
                </div>
                <span className="text-sm text-gray-500">1.2k posts</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    3
                  </span>
                  <span className="ml-3">#GautamGambhir</span>
                </div>
                <span className="text-sm text-gray-500">4,812 posts</span>
              </div>
            </div>
          </div>
          {/* Trend Insights */}
        <div className="lg:col-span-4 space-y-6">
          {/* Top Trends */}
          <div className="flex flex-col grid grid-cols-2 gap-6 lg:col-span-2">
            <div className="bg-white border rounded-lg p-6 w-50">
              <h4 className="text-md font-semibold mb-4">The Truth Wheel </h4>
              <div id="pattern-chart" className="h-64"></div>
            </div>
            <div className="bg-white border rounded-lg p-6 w-50">
              <h4 className="text-md font-semibold mb-4">
                Top Fake News
              </h4>
              <p className="text-md mb-2">
                <a
                  href="https://newschecker.in/fact-check/pakistani-airforce-helicopter-shot-down-by-afghan-forces-old-video-viral-with-false-claim/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Pakistani Airforce Helicopter Shot Down By Afghan Forces?
                </a>
              </p>
              <p className="text-md mb-2">
                <a
                  href="https://newschecker.in/fact-check/this-is-not-a-video-of-karnataka-chief-minister-siddaramaiah-dancing-drunk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Video Of Karnataka Chief Minister Siddaramaiah Dancing Drunk
                </a>
              </p>
              <p className="text-md mb-2">
                <a
                  href="https://newschecker.in/fact-check/was-bethlehem-church-attacked-on-christmas-heres-the-truth-behind-viral-video/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Was Bethlehem Church Attacked On Christmas?
                </a>
              </p>
              <h4 className="text-md font-semibold mb-4 mt-4 ">
                Top True News
              </h4>
              <p className="text-md mb-2">
                <a
                  href="https://www.latestly.com/agency-news/latest-news-icea-bats-for-cut-in-duties-on-parts-components-to-spur-electronics-manufacturing-6534041.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  ICEA Bats for Cut in Duties on Parts, Components to Spur Electronics Manufacturing
                </a>
              </p>
              <p className="text-md mb-2">
                <a
                  href="https://www.aljazeera.com/news/2024/12/30/india-launches-its-first-space-docking-mission"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  India launches its first space docking mission
                </a>
              </p>
              <p className="text-md mb-2">
                <a
                  href="https://timesofindia.indiatimes.com/technology/tech-news/looking-back-at-ai-in-2024-and-the-way-forward-cxo-speak/articleshow/116863786.cms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Looking back at AI in 2024 and the way forward: CXO speak
                </a>
              </p>
            </div>
          </div>
        </div>

        </div>
      </section>
    </>
  );
};

export default Analytics;
