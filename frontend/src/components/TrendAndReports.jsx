import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import image from "./images/InpImg.png";
import image2 from "./images/InpImg2.png";
import video from "./images/diljitdosanghpmmodi.mp4";
import audio from "./images/diljitdosanjhaudio.mp3";
import Sidebar from "./Sidebar";

const TrendAnalysis = () => {
  const reports = [
    {
      reporter: "Image",
      category: "Diljith dosanjh meets PM Modi",
      status: "True News",
      statusColor: "green",
    },
    {
      reporter: "Image",
      category: "Youtube",
      status: "True News",
      statusColor: "green",
    },
    {
      reporter: "Video",
      category: "Youtube",
      status: "True News",
      statusColor: "green",
    },
    {
      reporter: "Audio",
      category: "Twitter",
      status: "True News",
      statusColor: "green",
    },
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
        categories: ["DD News", "Hindustan Times ", "Google News", "Fact Check API ", "Other"],
      },
    };

    let patternChart, sourceChart;

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
      try {
        if (patternChart) patternChart.destroy();
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
                <table className="w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">
                        News Type
                      </th>
                      <th className="text-left py-3 px-4 font-semibold w-[200px]">
                        Insights
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
                            <span>{report.reporter}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 w-[200px] break-words">{report.category}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 bg-${report.statusColor}-100 text-${report.statusColor}-800 rounded-full text-xs`}
                          >
                            {report.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-blue-400">
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
              <h3 className="text-lg font-semibold mb-4">Extracted Information</h3>
              <ul className="space-y-5">
                <li className="text-sm">
                  <strong>Named Entity Recognition (NER):</strong>
                  <ul className="pl-4 list-disc">
                    <li><strong>Person:</strong> Diljit Dosanjh, Prime Minister of India</li>
                    <li><strong>Organization:</strong> Government of India, Prime Minister's Office</li>
                  </ul>
                </li>
                <li className="text-sm">
                  <strong>Transcription Of Video: </strong>
                  <ul className="pl-4 list-disc">
                    <li>Diljit Dosanjh meets the Prime Minister of India.</li>
                  </ul>
                </li>
                <li className="text-sm">
                  <strong>Sentiment Analysis:</strong>
                  <ul className="pl-4 list-disc">
                    <li><strong>Overall Sentiment:</strong> Positive</li>
                  </ul>
                </li>
                <li className="text-sm">
                  <strong>Deepfake Analysis:</strong>
                  <ul className="pl-4 list-disc">
                    <li><strong>Image Deepfake:</strong> Real Image</li>
                    <li><strong>Audio Deepfake:</strong> Real Audio</li>
                  </ul>
                </li>
                <li className="text-sm">
                  <strong>Insights drawn from Graphics:</strong>
                  <ul className="pl-4 list-disc">
                    <li> Diljit Dosanjh meets the Prime Minister of India.</li>
                    <li> Diljit: Fantastic start to 2025 </li>
                    <li> Gambhir to Team: Bahut ho gaya  </li>
                  </ul>
                </li>
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

      </section>
    </>
  );
};

export default TrendAnalysis;
