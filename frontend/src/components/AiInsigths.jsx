import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const AiInsights = () => {
  useEffect(() => {
    // AI Accuracy Chart
    const accuracyOptions = {
      chart: {
        type: "line",
        height: 320,
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: "Model Accuracy",
          data: [94, 95, 95.5, 96, 96.2, 96.5, 96.5],
        },
      ],
      xaxis: {
        categories: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      },
      colors: ["#0ea5e9"],
      stroke: {
        curve: "smooth",
        width: 3,
      },
    };

    const accuracyChart = new ApexCharts(document.querySelector("#ai-accuracy-chart"), accuracyOptions);
    accuracyChart.render();

    // Content Classification Chart
    const classificationOptions = {
      chart: {
        type: "donut",
        height: 256,
      },
      series: [45, 25, 20, 10],
      labels: ["Misinformation", "Propaganda", "Bias", "Other"],
      colors: ["#0ea5e9", "#22c55e", "#a855f7", "#64748b"],
    };

    const classificationChart = new ApexCharts(
      document.querySelector("#content-classification-chart"),
      classificationOptions
    );
    classificationChart.render();

    // Sentiment Analysis Chart
    const sentimentOptions = {
      chart: {
        type: "bar",
        height: 256,
        toolbar: {
          show: false,
        },
      },
      series: [
        {
          name: "Sentiment Score",
          data: [-30, -20, 10, 30, 40],
        },
      ],
      colors: ["#0ea5e9"],
      xaxis: {
        categories: ["Very Negative", "Negative", "Neutral", "Positive", "Very Positive"],
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
        },
      },
    };

    const sentimentChart = new ApexCharts(
      document.querySelector("#sentiment-analysis-chart"),
      sentimentOptions
    );
    sentimentChart.render();

    // Cleanup
    return () => {
      accuracyChart.destroy();
      classificationChart.destroy();
      sentimentChart.destroy();
    };
  }, []);

  return (
    <section className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* AI Analysis Overview */}
        <div className="lg:col-span-8">
          <div className="bg-white border rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">AI Insights Dashboard</h3>
              <button className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Run New Analysis
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <InfoCard
                label="AI Confidence Score"
                value="96.5%"
                iconClass="fas fa-robot text-primary-600"
                bgColor="bg-primary-50"
                textColor="text-primary-700"
              />
              <InfoCard
                label="Processing Time"
                value="1.2s"
                iconClass="fas fa-clock text-secondary-600"
                bgColor="bg-secondary-50"
                textColor="text-secondary-700"
              />
              <InfoCard
                label="Patterns Detected"
                value="127"
                iconClass="fas fa-chart-line text-accent-600"
                bgColor="bg-accent-50"
                textColor="text-accent-700"
              />
            </div>
            <div id="ai-accuracy-chart" className="h-80"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border rounded-lg p-6">
              <h4 className="text-md font-semibold mb-4">Content Classification</h4>
              <div id="content-classification-chart" className="h-64"></div>
            </div>
            <div className="bg-white border rounded-lg p-6">
              <h4 className="text-md font-semibold mb-4">Sentiment Analysis</h4>
              <div id="sentiment-analysis-chart" className="h-64"></div>
            </div>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="lg:col-span-4 space-y-6">
          <InsightsPanel />
          <ModelPerformance />
        </div>
      </div>
    </section>
  );
};

const InfoCard = ({ label, value, iconClass, bgColor, textColor }) => (
  <div className={`p-4 ${bgColor} rounded-lg`}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium">{label}</span>
      <i className={iconClass}></i>
    </div>
    <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
  </div>
);

const InsightsPanel = () => (
  <div className="bg-white border rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Key AI Findings</h3>
    <div className="space-y-4">
      <InsightCard
        label="High-Risk Content Detected"
        time="15 minutes ago"
        iconClass="fas fa-exclamation-triangle text-red-600"
        bgColor="bg-red-100"
      />
      <InsightCard
        label="Pattern Recognition Complete"
        time="1 hour ago"
        iconClass="fas fa-chart-pie text-green-600"
        bgColor="bg-green-100"
      />
      <InsightCard
        label="Model Training Updated"
        time="2 hours ago"
        iconClass="fas fa-brain text-blue-600"
        bgColor="bg-blue-100"
      />
    </div>
  </div>
);

const InsightCard = ({ label, time, iconClass, bgColor }) => (
  <div className="p-4 bg-white border rounded-lg">
    <div className="flex items-center">
      <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center`}>
        <i className={iconClass}></i>
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  </div>
);

const ModelPerformance = () => (
  <div className="bg-white border rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Model Performance</h3>
    <PerformanceBar label="Accuracy" value={96.5} color="bg-primary-600" />
    <PerformanceBar label="Precision" value={94.2} color="bg-secondary-600" />
    <PerformanceBar label="Recall" value={92.8} color="bg-accent-600" />
  </div>
);

const PerformanceBar = ({ label, value, color }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm">{label}</span>
      <span className="text-sm font-medium">{value}%</span>
    </div>
    <div className="h-2 bg-gray-200 rounded-full">
      <div className={`h-2 ${color} rounded-full`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

export default AiInsights;
