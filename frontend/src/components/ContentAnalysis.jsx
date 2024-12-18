import React, { useEffect } from "react";
import "./ContentAnalysis.css";
import ApexCharts from "apexcharts";

const ContentAnalysis = () => {
  useEffect(() => {
    const contentOptions = {
      chart: {
        type: "bar",
        height: 320,
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      series: [
        { name: "Verified", data: [44, 55, 41, 37, 22, 43, 21] },
        { name: "Suspicious", data: [13, 23, 20, 8, 13, 27, 33] },
      ],
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      colors: ["#22c55e", "#ef4444"],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 4,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
      },
    };

    const contentChart = new ApexCharts(
      document.querySelector("#content-distribution-chart"),
      contentOptions
    );
    contentChart.render();

    return () => contentChart.destroy();
  }, []);

  return (
    <section className="content-analysis">
      <div className="content-grid">
        <div className="content-main">
          <div className="content-dashboard">
            <h3 className="dashboard-title">Content Analysis Dashboard</h3>
            <div className="content-summary">
              <div className="summary-item primary">
                <i className="fas fa-file-alt"></i>
                <span>Total Content: 1,234</span>
              </div>
              <div className="summary-item red">
                <i className="fas fa-exclamation-circle"></i>
                <span>Flagged: 89</span>
              </div>
              <div className="summary-item green">
                <i className="fas fa-check-circle"></i>
                <span>Verified: 945</span>
              </div>
              <div className="summary-item yellow">
                <i className="fas fa-clock"></i>
                <span>Pending: 200</span>
              </div>
            </div>
            <div id="content-distribution-chart" className="chart-container"></div>
          </div>

          <div className="recent-analysis">
            <div className="recent-header">
              <h3>Recent Content Analysis</h3>
              <div className="actions">
                <button className="btn export">Export</button>
                <button className="btn primary">New Analysis</button>
              </div>
            </div>
            <table className="recent-table">
              <thead>
                <tr>
                  <th>Content ID</th>
                  <th>Source</th>
                  <th>Type</th>
                  <th>Risk Level</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#12345</td>
                  <td>Social Media</td>
                  <td>Article</td>
                  <td><span className="risk high">High</span></td>
                  <td>Under Review</td>
                  <td><button className="action-btn">View Details</button></td>
                </tr>
                <tr>
                  <td>#12346</td>
                  <td>News Site</td>
                  <td>Image</td>
                  <td><span className="risk medium">Medium</span></td>
                  <td>Verified</td>
                  <td><button className="action-btn">View Details</button></td>
                </tr>
                <tr>
                  <td>#12347</td>
                  <td>Blog</td>
                  <td>Video</td>
                  <td><span className="risk low">Low</span></td>
                  <td>Processed</td>
                  <td><button className="action-btn">View Details</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="content-sidebar">
          <div className="quick-tools">
            <h3>Quick Analysis Tools</h3>
            <button className="tool-btn">
              <i className="fas fa-robot"></i>
              <span>AI Content Scanner</span>
            </button>
            <button className="tool-btn">
              <i className="fas fa-link"></i>
              <span>Source Checker</span>
            </button>
            <button className="tool-btn">
              <i className="fas fa-image"></i>
              <span>Image Analyzer</span>
            </button>
          </div>

          <div className="summary">
            <h3>Analysis Summary</h3>
            <div className="summary-item">
              <span>Accuracy Score</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: "98%" }}></div>
              </div>
            </div>
            <div className="summary-item">
              <span>Processing Speed</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: "85%" }}></div>
              </div>
            </div>
            <div className="summary-item">
              <span>AI Confidence</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: "92%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentAnalysis;
