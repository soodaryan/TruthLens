import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
// import image from "./images/deepfake.png";
const TrendAnalysis = () => {
  const reports = [
    {
      id: "#4821",
      reporter: "Awaara Khabrein",
      avatar: "https://avatar.iran.liara.run/public/1",
      category: "Misinformation",
      status: "Fake News",
      statusColor: "red",
    },
    {
      id: "#4821",
      reporter: "AajTak",
      avatar: "https://avatar.iran.liara.run/public/1",
      category: "Correct Information",
      status: "True News",
      statusColor: "green",
    },
    {
      id: "#4821",
      reporter: "Twitter",
      avatar: "https://avatar.iran.liara.run/public/1",
      category: "Correct Information",
      status: "Fake News",
      statusColor: "red",
    },
    {
      id: "#4821",
      reporter: "Instagram",
      avatar: "https://avatar.iran.liara.run/public/1",
      category: "Correct Information",
      status: "True News",
      statusColor: "green",
    },
  ];

  const images = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ];

  const videos = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://www.w3schools.com/html/movie.mp4",
  ];
  const extractedInfo = [
    "Insight 1: AI-driven patterns identified.",
    "Insight 2: Source reliability has improved by 15%.",
    "Insight 3: Key trends show a rise in user engagement.",
    "Insight 4: Reports flagged for further review increased.",
  ];

  useEffect(() => {
    const patternOptions = {
      chart: {
        type: "donut",
        height: 256,
      },
      series: [44, 55, 41, 17],
      labels: ["Social", "News", "Blogs", "Other"],
      colors: ["#0ea5e9", "#22c55e", "#a855f7", "#64748b"],
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
        categories: ["Twitter", "Facebook", "News", "Blogs", "Other"],
      },
    };

    let patternChart, sourceChart;

    try {
      patternChart = new ApexCharts(
        document.querySelector("#pattern-chart"),
        patternOptions
      );
      patternChart.render();

      sourceChart = new ApexCharts(
        document.querySelector("#source-chart"),
        sourceOptions
      );
      sourceChart.render();
    } catch (error) {
      console.error("Error initializing charts:", error);
    }

    return () => {
      try {
        if (patternChart) patternChart.destroy();
        if (sourceChart) sourceChart.destroy();
      } catch (error) {
        console.error("Error destroying charts:", error);
      }
    };
  }, []);

  return (
    <section id="trend_analysis" className="p-6 ml-60">
      {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-6"> */}
      {/* Trend Overview */}
          {/* Main Reports Area */}
          <div className="bg-white border rounded-lg p-6 mb-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="flex flex-col space-y-6 lg:col-span-2 xl:col-span-3">

            {/* 1st Quadrant: Report Table */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                Reports and Analysis
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">ID</th>
                      <th className="text-left py-3 px-4 font-semibold">
                        News Source
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report, index) => (
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
                        <td className="py-3 px-4">
                          <button className="text-primary-600 hover:text-primary-800">
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                Extracted Information
              </h3>
              <ul className="space-y-4">
                {extractedInfo.map((info, index) => (
                  <li key={index} className="text-sm">
                    {info}
                  </li>
                ))}
              </ul>
            </div>
                </div>
            <div className="flex flex-col space-y-6 lg:col-span-2 xl:col-span-1">

            {/* 2nd Quadrant: Images */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Images</h3>
              <div className="grid grid-cols-2 gap-4">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Image ${index + 1}`}
                    className="rounded-lg"
                    />
                  ))}
              </div>
            </div>

            {/* 3rd Quadrant: Videos */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Videos</h3>
              <div className="grid grid-cols-1 gap-4">
                {videos.map((video, index) => (
                  <video
                    key={index}
                    controls
                    className="w-full rounded-lg"
                    src={video.src}
                    alt={`Video ${index + 1}`}
                    />
                  ))}
              </div>
            </div>
            </div>

            {/* 4th Quadrant: Extracted Information */}
          </div>
          {/* <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Trend Analysis</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm bg-gray-100 rounded-lg">24h</button>
                <button className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg">7d</button>
                <button className="px-4 py-2 text-sm bg-gray-100 rounded-lg">30d</button>
              </div>
            </div>
            <div id="trend-analysis-chart" className="h-80"></div> */}
          {/* </div> */}

          {/* Trend Patterns */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border rounded-lg p-6">
              <h4 className="text-md font-semibold mb-4">Content Patterns</h4>
              <div id="pattern-chart" className="h-64"></div>
            </div>
            <div className="bg-white border rounded-lg p-6">
              <h4 className="text-md font-semibold mb-4">
                Source Distribution
              </h4>
              <div id="source-chart" className="h-64"></div>
            </div>
          </div> */}
        

        {/* Trend Insights */}
        <div className="lg:col-span-4 space-y-6">
          {/* Top Trends */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Top Trending Topics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    1
                  </span>
                  <span className="ml-3">Election Integrity</span>
                </div>
                <span className="text-sm text-gray-500">2.5k mentions</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    2
                  </span>
                  <span className="ml-3">Vaccine Safety</span>
                </div>
                <span className="text-sm text-gray-500">1.8k mentions</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    3
                  </span>
                  <span className="ml-3">Climate Change</span>
                </div>
                <span className="text-sm text-gray-500">1.2k mentions</span>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white border rounded-lg p-6">
              <h4 className="text-md font-semibold mb-4">Content Patterns</h4>
              <div id="pattern-chart" className="h-64"></div>
            </div>
          </div>
          <div>
            <div className="bg-white border rounded-lg p-6">
              <h4 className="text-md font-semibold mb-4">
                Source Distribution
              </h4>
              <div id="source-chart" className="h-64"></div>
            </div>
          </div>
        </div>
      
    </section>
  );
};

export default TrendAnalysis;
