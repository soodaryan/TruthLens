import React, { useEffect } from "react";
import { useState } from "react";
import ApexCharts from "apexcharts";
// import image from "./images/InpImg.png";
// import image2 from "./images/fakeimage.jpg";
// import video from "./images/diljitdosanghpmmodi.mp4";
// import audio from "./images/diljitdosanjhaudio.mp3";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/authContext";
import ReactMarkdown from "react-markdown";

const TrendAnalysis = () => {
  const [latestData, setLatestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  const email = currentUser.email; // Replace with actual user email from auth

  useEffect(() => {
      const fetchLatestData = async () => {
          try {
              const response = await fetch(`https://truthlens.aimsdtu.in/3000/get-latest-data?email=${email}`);

              if (!response.ok) {
                  throw new Error("Failed to fetch data");
              }

              const result = await response.json();
              setLatestData(result.data);
              console.log(result.data);
          } catch (error) {
              setError(error.message);
          } finally {
              setLoading(false);
          }
      };

      fetchLatestData();
  }, []);
  const reports = [
    {
      reporter: "Image",
      category: "Diljith Dosanjh meets PM Modi",
      status: "True News",
      statusColor: "green",
    },
    {
      reporter: "Image",
      category: "UFO spotted in open sky ",
      status: "False News",
      statusColor: "red",
    },
    {
      reporter: "Video",
      category: "Farmers are angry with Diljit Dosanjh",
      status: "True News",
      statusColor: "green",
    },
    {
      reporter: "Audio",
      category: "दिल्ली में प्रधानमंत्री मोदी से सिंगर दिलजीत दोसांझ की मुलाकात हुई है।",
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
      // patternChart.render();

    } catch (error) {
      console.error("Error initializing charts:", error);
    }


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
                <table className="w-[100%]">
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
                        <td className="py-3 px-4 w-[200px] break-words">
                          {report.category}
                        </td>
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
            {/* <div className="bg-white border rounded-lg p-6">
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
                  <strong>Sentiment Analysis:</strong>
                  <ul className="pl-4 list-disc">
                    <li><strong>Overall Sentiment:</strong> Positive</li>
                  </ul>

                </li>
                <li className="text-sm">
                  <strong>Deepfake and GenAI Image Analysis:</strong>
                  <ul className="pl-4 list-disc">
                    <li><strong>Image Deepfake or Generated by AI:</strong> Fake Image</li>
                    <li><strong>Audio Deepfake:</strong> Real Audio</li>
                  </ul>
                </li>
                <li className="text-sm">
                  <strong>Insights drawn from Graphics:</strong>
                  <ul className="pl-4 list-disc">
                    <li> Breaking News</li>
                    <li> Diljit Dosanjh meets PM Modi</li>
                    <li> Times Now 19 Headlines</li>
                    <li> New Orleans Crash Suspect Dies </li>
                  </ul>
                </li>
                <li className="text-sm">
                  <strong>Insights drawn from Related Links:</strong>
                  <ul className="pl-4 list-disc">
                    <li> PM Modi praised Dosanjh for representing India globally, while Dosanjh expressed admiration for India's greatness and cultural richness.</li>
                    <li> Prime Minister Narendra Modi and Diljit Dosanjh discussed India's vibrancy, music, and yoga during their meeting.
                    </li>
                    <li> Diljit Dosanjh met Prime Minister Narendra Modi, and they discussed topics like music, culture, and his journey to international fame.  </li>
                    <li> PM Modi praised Dosanjh for his multifaceted talent and his ability to blend tradition with creativity. </li>
                  </ul>
                </li>
              </ul>
            </div> */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                Extracted Information
              </h3>
              <ReactMarkdown>{latestData?.inputInsights}</ReactMarkdown>
            </div>
          </div>
          <div className="flex flex-col space-y-6 lg:col-span-2 xl:col-span-1">
            {/* 2nd Quadrant: Images */}
            {/* <div className="bg-white border rounded-lg p-6">
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
            </div> */}

            {/* 3rd Quadrant: Videos */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Videos</h3>
              <div className="grid grid-cols-1 gap-4"></div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Related links</h3>
              <div className="flex flex-col gap-4">
                {latestData?.videoLinks?.length > 0 ? (
                  latestData.videoLinks.map((videoLink, index) => {
                    return (
                      <div key={index} className="flex items-center gap-4">
                        <a
                          href={videoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline text-sm break-all"
                        >
                          {videoLink}
                        </a>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">No videos available.</p>
                )}
              </div>
              <div className="flex flex-col gap-4">
                {latestData?.blogLinks?.length > 0 ? (
                  latestData.blogLinks.map((blogLinks, index) => {
                    return (
                      <div key={index} className="flex items-center gap-4">
                        <a
                          href={blogLinks}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline text-sm break-all"
                        >
                          {blogLinks}
                        </a>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">No videos available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ml-[22%] mb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Information form Trusted Sources
          </h3>
          <ul className="space-y-5">
            <li className="text-sm">
              <strong>Named Entity Recognition (NER):</strong>
              <ul className="pl-4 list-disc">
                <li>
                  <strong>Person:</strong> Diljit Dosanjh, Prime Minister of
                  India
                </li>
                <li>
                  <strong>Organization:</strong> Government of India, Prime
                  Minister's Office
                </li>
              </ul>
            </li>
            <li className="text-sm">
              <strong>Insights drawn from Related Links:</strong>
              <ul className="pl-4 list-disc">
                <li>
                  {" "}
                  Punjabi actor-singer Diljit Dosanjh met Prime Minister
                  Narendra Modi on Wednesday for a memorable discussion.
                </li>
                <li>
                  {" "}
                  Dosanjh shared pictures of the meeting on X, calling it a
                  fantastic start to 2025 and highlighting their conversation on
                  music.
                </li>
                <li>
                  {" "}
                  Modi praised Dosanjh's rise from humble beginnings to
                  achieving international fame during their interaction.{" "}
                </li>
                <li>
                  {" "}
                  PM Modi described Dosanjh as a multifaceted talent blending
                  creativity with tradition in a post on X.{" "}
                </li>
                <li>
                  The meeting focused on music, culture, and Dosanjh's
                  contributions to making India's name shine globally.
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="mr-[7%] bg-white border rounded-lg p-6 font-semibold h-40">
          Reports of the input Information have been analyzed and matches with
          our Trusted Sources. Therefore it is{" "}
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            VERIFIED
          </span>{" "}
          News
        </div>
      </section>
    </>
  );
};

export default TrendAnalysis;
