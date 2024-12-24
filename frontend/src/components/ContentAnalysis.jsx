import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const ContentAnalysis = () => {
  useEffect(() => {
    // Initialize the ApexCharts content distribution chart
    const contentOptions = {
      chart: {
        type: 'bar',
        height: 320,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: 'Verified',
          data: [44, 55, 41, 37, 22, 43, 21],
        },
        {
          name: 'Suspicious',
          data: [13, 23, 20, 8, 13, 27, 33],
        },
      ],
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      colors: ['#22c55e', '#ef4444'],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 4,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
      },
    };

    const contentChart = new ApexCharts(
      document.querySelector('#content-distribution-chart'),
      contentOptions
    );
    contentChart.render();

    // Cleanup on unmount
    return () => {
      contentChart.destroy();
    };
  }, []);

  return (
    <section id="content_analysis" className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Analysis Area */}
        <div className="lg:col-span-8">
          <div className="bg-white border rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-6">Content Analysis Dashboard</h3>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center bg-primary-50 text-primary-700 px-4 py-2 rounded-lg">
                <i className="fas fa-file-alt mr-2"></i>
                <span>Total Content: 1,234</span>
              </div>
              <div className="flex items-center bg-red-50 text-red-700 px-4 py-2 rounded-lg">
                <i className="fas fa-exclamation-circle mr-2"></i>
                <span>Flagged: 89</span>
              </div>
              <div className="flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-lg">
                <i className="fas fa-check-circle mr-2"></i>
                <span>Verified: 945</span>
              </div>
              <div className="flex items-center bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg">
                <i className="fas fa-clock mr-2"></i>
                <span>Pending: 200</span>
              </div>
            </div>
            <div id="content-distribution-chart" className="h-80"></div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Recent Content Analysis</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
                  Export
                </button>
                <button className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  New Analysis
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Content ID</th>
                    <th className="text-left py-3 px-4">Source</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Risk Level</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">#12345</td>
                    <td className="py-3 px-4">Social Media</td>
                    <td className="py-3 px-4">Article</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                        High
                      </span>
                    </td>
                    <td className="py-3 px-4">Under Review</td>
                    <td className="py-3 px-4">
                      <button className="text-primary-600 hover:text-primary-800">
                        View Details
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">#12346</td>
                    <td className="py-3 px-4">News Site</td>
                    <td className="py-3 px-4">Image</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                        Medium
                      </span>
                    </td>
                    <td className="py-3 px-4">Verified</td>
                    <td className="py-3 px-4">
                      <button className="text-primary-600 hover:text-primary-800">
                        View Details
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4">#12347</td>
                    <td className="py-3 px-4">Blog</td>
                    <td className="py-3 px-4">Video</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Low
                      </span>
                    </td>
                    <td className="py-3 px-4">Processed</td>
                    <td className="py-3 px-4">
                      <button className="text-primary-600 hover:text-primary-800">
                        View Details
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Analysis Tools */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Analysis Tools</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <i className="fas fa-robot text-primary-600 mr-3"></i>
                  <span>AI Content Scanner</span>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </button>
              <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <i className="fas fa-link text-primary-600 mr-3"></i>
                  <span>Source Checker</span>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </button>
              <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <i className="fas fa-image text-primary-600 mr-3"></i>
                  <span>Image Analyzer</span>
                </div>
                <i className="fas fa-chevron-right text-gray-400"></i>
              </button>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Analysis Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Accuracy Score</span>
                <span className="text-sm font-semibold">98%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{ width: '98%' }}
                ></div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">Average Risk</span>
                <span className="text-sm font-semibold">Medium</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentAnalysis;
