import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const ReportGeneration = () => {
  const [previewOptions, setPreviewOptions] = useState({
    chart: {
      type: 'bar',
      height: 256,
      toolbar: {
        show: false,
      },
    },
    series: [
      {
        name: 'Incidents',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
    ],
    xaxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9'],
    },
    colors: ['#0ea5e9'],
  });

  useEffect(() => {
    // Optional: You could fetch or update chart data here if needed
  }, []);

  return (
    <section className="p-6 ml-60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Report Builder */}
        <div className="lg:col-span-8">
          <div className="bg-white border rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Report Generator</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Save Draft</button>
                <button className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700">Generate Report</button>
              </div>
            </div>

            {/* Report Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Report Type</h4>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="report-type" className="text-primary-600" checked />
                    <span className="ml-2">Executive Summary</span>
                  </label>
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="report-type" className="text-primary-600" />
                    <span className="ml-2">Detailed Analysis</span>
                  </label>
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="radio" name="report-type" className="text-primary-600" />
                    <span className="ml-2">Custom Report</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Time Period</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                    <input type="date" className="w-full p-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">End Date</label>
                    <input type="date" className="w-full p-2 border rounded-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Report Sections */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Include Sections</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" className="text-primary-600" checked />
                  <span className="ml-2">Overview Statistics</span>
                </label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" className="text-primary-600" checked />
                  <span className="ml-2">Trend Analysis</span>
                </label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" className="text-primary-600" checked />
                  <span className="ml-2">AI Insights</span>
                </label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" className="text-primary-600" />
                  <span className="ml-2">Source Analysis</span>
                </label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" className="text-primary-600" />
                  <span className="ml-2">User Reports</span>
                </label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" className="text-primary-600" />
                  <span className="ml-2">Recommendations</span>
                </label>
              </div>
            </div>
          </div>

          {/* Report Preview */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-6">Report Preview</h3>
            <div className="border rounded-lg p-6 bg-gray-50">
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h4 className="text-xl font-bold">Misinformation Analysis Report</h4>
                    <p className="text-sm text-gray-500">Generated on January 15, 2024</p>
                  </div>
                  <img src="https://placehold.co/100x40?text=Logo" alt="Company Logo" className="h-10" />
                </div>
                
                <div className="space-y-4">
                  <h5 className="font-semibold">Executive Summary</h5>
                  <p className="text-gray-600">This report provides a comprehensive analysis of misinformation trends and patterns observed during the specified period...</p>
                </div>

                <div id="preview-chart" className="h-64 bg-white border rounded-lg">
                  {/* Use the Chart component with state options */}
                  <Chart
                    options={previewOptions}
                    series={previewOptions.series}
                    type="bar"
                    height={256}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="lg:col-span-4 space-y-6">
          {/* Export Options */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Export Options</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <i className="fas fa-file-pdf text-red-600 mr-3"></i>
                  <span>Export as PDF</span>
                </div>
                <i className="fas fa-download"></i>
              </button>
              <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <i className="fas fa-file-excel text-green-600 mr-3"></i>
                  <span>Export as Excel</span>
                </div>
                <i className="fas fa-download"></i>
              </button>
              <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <i className="fas fa-file-csv text-yellow-600 mr-3"></i>
                  <span>Export as CSV</span>
                </div>
                <i className="fas fa-download"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportGeneration;
