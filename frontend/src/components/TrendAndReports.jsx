import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import image from "./images/deepfake.png";
import image2 from "./images/aajtak.jpg";
import video from "./images/realnews.mp4";
import audio from "./images/fakevoice.mp3";
import Sidebar from "./Sidebar";

const TrendAnalysis = () => {
  const reports = [
    {
      reporter: "Awaara Khabrein",
      avatar: "https://avatar.iran.liara.run/public/1",
      category: "Misinformation",
      status: "Fake News",
      statusColor: "red",
    },
    {
      reporter: "AajTak",
      avatar: "https://avatar.iran.liara.run/public/1",
      category: "Correct Information",
      status: "True News",
      statusColor: "green",
    },
    {
      reporter: "Twitter",
      avatar: "https://avatar.iran.liara.run/public/1",
      category: "Correct Information",
      status: "Fake News",
      statusColor: "red",
    },
    {
      reporter: "Instagram",
      avatar: "https://avatar.iran.liara.run/public/1",
      category: "Correct Information",
      status: "True News",
      statusColor: "green",
    },
  ];

  const images = [
    "./images/aajtak.png",
    "./images/deepfake.png",
  ];

  const videos = [
    "https://www.w3schools.com/html/mov_bbb.mp4",
  ];
  const audios = [
    "https://www.w3schools.com/html/mov_bbb.mp3",
  ];
  const extractedInfo = [
    "Insight 1: AI-driven patterns identified.",
    "Insight 2: Source reliability has improved by 15%.",
    "Insight 3: Key trends show a rise in user engagement.",
    "Insight 4: Reports flagged for further review increased.",
    "Insight 1: AI-driven patterns identified.",
    "Insight 2: Source reliability has improved by 15%.",
    "Insight 3: Key trends show a rise in user engagement.",
    "Insight 4: Reports flagged for further review increased.",
    "Insight 4: Reports flagged for further review increased.",
  ];

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
    <>
    <Sidebar />
    
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
                    <th className="text-left py-3 px-4 font-semibold">
                      News Source
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Source
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
                          View Report
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
            <ul className="space-y-5">
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
            <div className="flex flex-col gap-4">
              
                <img
                  src={image}
                  className="rounded-lg w-100 h-100"
                />
                <img
                  src={image2}
                  className="rounded-lg w-100 h-100"
                />
              
            </div>
          </div>

          {/* 3rd Quadrant: Videos */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Videos</h3>
            <div className="grid grid-cols-1 gap-4">
                <video
                  controls
                  className="w-full rounded-lg"
                  src={video}
                />
            </div>
          </div>
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Audios</h3>
            <div className="grid grid-cols-1 gap-4">
                <audio
                  controls
                  className="w-full rounded-lg"
                  src={audio}
                />
            </div>
          </div>
        </div>
      </div>
      {/* Trend Insights */}
      <div className="lg:col-span-4 space-y-6">
        {/* Top Trends */}
        <div className="flex flex-col grid grid-cols-2 gap-6 lg:col-span-2">
          <div className="bg-white border rounded-lg p-6 w-50">
            <h4 className="text-md font-semibold mb-4">The News Wheel </h4>
            <div id="pattern-chart" className="h-64"></div>
          </div>
          <div className="bg-white border rounded-lg p-6 w-50">
            <h4 className="text-md font-semibold mb-4">
              Source Distribution
            </h4>
            <div id="source-chart" className="h-64"></div>
          </div>
        </div>
      </div>

    </section>
    </>
  );
};

export default TrendAnalysis;
