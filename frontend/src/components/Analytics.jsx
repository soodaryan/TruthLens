import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { useRef } from 'react';
import Sidebar from './Sidebar';
const Analytics = () => {
  const trendChartRef = useRef(null);

  useEffect(() => {
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

    return () => {
      chart.destroy();
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
                    <span className="text-sm font-medium">70%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-primary-500 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Health</span>
                    <span className="text-sm font-medium">32%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-secondary-500 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Technology</span>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-accent-500 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Finance</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-primary-500 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Cricket</span>
                    <span className="text-sm font-medium">50%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-primary-500 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Education</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-primary-500 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>

        </div>
        <div className="grid grid-cols-2 gap-6">

          <div className="p-6 bg-white border rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-700">Recent Activities</h3>
              <button className="text-sm text-primary-600">View All</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <i className="fas fa-exclamation-triangle text-primary-600"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">New report submitted</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center">
                  <i className="fas fa-check text-secondary-600"></i>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Source verified</p>
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

        </div>
      </section>
    </>
  );
};

export default Analytics;
