import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const TrendAnalysis = () => {
  useEffect(() => {
    // Main Trend Analysis Chart
    const trendOptions = {
      chart: {
        type: "area",
        height: 320,
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: "Misinformation Cases",
          data: [31, 40, 28, 51, 42, 109, 100],
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
    const trendChart = new ApexCharts(
      document.querySelector("#trend-analysis-chart"),
      trendOptions
    );
    trendChart.render();

    // Pattern Chart
    const patternOptions = {
      chart: {
        type: "donut",
        height: 256,
      },
      series: [44, 55, 41, 17],
      labels: ["Social", "News", "Blogs", "Other"],
      colors: ["#0ea5e9", "#22c55e", "#a855f7", "#64748b"],
    };
    const patternChart = new ApexCharts(
      document.querySelector("#pattern-chart"),
      patternOptions
    );
    patternChart.render();

    // Source Chart
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
        categories: ["Twitter", "Facebook", "News", "Blogs", "Other"],
      },
    };
    const sourceChart = new ApexCharts(
      document.querySelector("#source-chart"),
      sourceOptions
    );
    sourceChart.render();

    return () => {
      trendChart.destroy();
      patternChart.destroy();
      sourceChart.destroy();
    };
  }, []);

  return (
    <section id="trend_analysis" className="p-6 ml-60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trend Overview */}
        <div className="lg:col-span-8">
          <div className="bg-white border rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Trend Analysis</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm bg-gray-100 rounded-lg">24h</button>
                <button className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg">7d</button>
                <button className="px-4 py-2 text-sm bg-gray-100 rounded-lg">30d</button>
              </div>
            </div>
            <div id="trend-analysis-chart" className="h-80"></div>
          </div>

          {/* Trend Patterns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border rounded-lg p-6">
              <h4 className="text-md font-semibold mb-4">Content Patterns</h4>
              <div id="pattern-chart" className="h-64"></div>
            </div>
            <div className="bg-white border rounded-lg p-6">
              <h4 className="text-md font-semibold mb-4">Source Distribution</h4>
              <div id="source-chart" className="h-64"></div>
            </div>
          </div>
        </div>

        {/* Trend Insights */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <i className="fas fa-arrow-up text-red-600 mr-2"></i>
                  <span className="font-medium text-red-800">Rising Trend</span>
                </div>
                <p className="text-sm text-red-600">32% increase in political misinformation</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <i className="fas fa-arrow-down text-green-600 mr-2"></i>
                  <span className="font-medium text-green-800">Declining Trend</span>
                </div>
                <p className="text-sm text-green-600">15% decrease in health misinformation</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <i className="fas fa-exclamation-triangle text-yellow-600 mr-2"></i>
                  <span className="font-medium text-yellow-800">Emerging Pattern</span>
                </div>
                <p className="text-sm text-yellow-600">New cluster detected in tech sector</p>
              </div>
            </div>
          </div>

          {/* Top Trends */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Top Trending Topics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">1</span>
                  <span className="ml-3">Election Integrity</span>
                </div>
                <span className="text-sm text-gray-500">2.5k mentions</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">2</span>
                  <span className="ml-3">Vaccine Safety</span>
                </div>
                <span className="text-sm text-gray-500">1.8k mentions</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">3</span>
                  <span className="ml-3">Climate Change</span>
                </div>
                <span className="text-sm text-gray-500">1.2k mentions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendAnalysis;
