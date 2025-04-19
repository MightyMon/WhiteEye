"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./HashReport.module.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { Chart } from "primereact/chart";

const HashReport = () => {
  const searchParams = useSearchParams();
  const hash = searchParams.get("hash");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [chartData2, setChartData2] = useState({});
  const [chartOptions2, setChartOptions2] = useState({});

  useEffect(() => {
    if (hash) {
      fetchReport(hash);
    }
  }, [hash]);

  const fetchReport = async (hash) => {
    setLoading(true);
    setReport(null);
    try {
      const response = await fetch(
        `http://localhost:8080/hashdata?hash=${hash}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      if (data && data.data && data.data.attributes) {
        setReport(data.data.attributes);
        const lastAnalysisStats = data.data.attributes.sandbox_verdicts;

        const chartData = {
          labels: Object.keys(lastAnalysisStats).map(
            (key) => lastAnalysisStats[key].sandbox_name
          ),
          datasets: [
            {
              data: Object.keys(lastAnalysisStats).map(
                (key) => lastAnalysisStats[key].confidence
              ),
              backgroundColor: [
                "#FF6347", // malicious
                "#00FF00", // harmless
                "#808080", // other
              ],
              hoverBackgroundColor: ["#FF8C78", "#8CEC8C", "#BDBDBD"],
            },
          ],
        };
        const basicProperties = data.data.attributes.last_analysis_stats;
        const chartData2 = {
          labels: Object.keys(basicProperties),
          datasets: [
            {
              data: Object.values(basicProperties),
              backgroundColor: [
                "red",
                "gray",
                "lightblue",
                "green",
                "orange",
                "lightgray",
                "pink",
                "purple", // type-unsupported (additional color)
              ],
              hoverBackgroundColor: [
                "#FF8C78",
                "#FFD180",
                "#8CEC8C",
                "#BDBDBD",
                "#82B1FF",
                "#BE93D4",
                "#FF7F7F",
                "#FFEB3B",
              ],
            },
          ],
        };
        const chartOptions = {
          cutout: "60%",
        };
        const chartOptions2 = {
          cutout: "60%",
        };

        setChartData(chartData);
        setChartData2(chartData2);
        setChartOptions(chartOptions);
        setChartOptions2(chartOptions2);
      } else {
        setError("Failed to fetch data. Please try again.");
      }
    } catch (error) {
      console.error("Fetch report failed:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reanalyse = async (hash) => {
    try {
      const response = await fetch(
        `http://localhost:8080/hashdata/reanalyze?hash=${hash}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Reanalysis response:", data);
      alert("reanalysis done reload the page to get the updated data")
      // Optionally update state or perform further operations
    } catch (error) {
      console.error("Reanalysis failed:", error);
      alert("The File has not been re-Analysed");
    }
  };

  const Download = async (hash) => {
    try {
      const response = await fetch(
        `http://localhost:8080/hashpdfdownload?hash=${hash}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${hash}.pdf`; // Define the filename here
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className={styles.containerwrap}>
      {loading && <ProgressSpinner />}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {report && (
        <div className={styles.container}>
          <div className={styles.buttonrow}>
            <button
              className={styles.leftbutton}
              onClick={() => window.history.back()}
            >
              <i className="pi pi-arrow-left"></i> Go Back
            </button>
            <button
              className={styles.rightbutton}
              onClick={() => reanalyse(hash)}
            >
              <i className="pi pi-sync"></i> Reanalyse
            </button>
            <button
              className={styles.rightbutton}
              onClick={() => Download(hash)}
            >
              <i className="pi pi-download"></i> Download report
            </button>
          </div>
          <div>
            <h1 className={styles.ReportHeading}>Report</h1>
          </div>
          <h3>Report for Hash: {hash}</h3>
          <h2 className={styles.he2}>Basic properties</h2>
          <div className={styles.header1}>
            <div className={styles.basicProperties}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>Common name :</strong>
                    </td>
                    <td>
                      {report.popular_threat_classification?.suggested_threat_label || ""}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>MD5:</strong>
                    </td>
                    <td>{report.md5}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>SHA1:</strong>
                    </td>
                    <td>{report.sha1}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>SHA256:</strong>
                    </td>
                    <td>{report.sha256}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>vhash:</strong>
                    </td>
                    <td>{report.vhash}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Authentihash:</strong>
                    </td>
                    <td>{report.authentihash}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>imphash:</strong>
                    </td>
                    <td>{report.imphash}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>ssdeep:</strong>
                    </td>
                    <td>{report.ssdeep}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Size(bytes):</strong>
                    </td>
                    <td>{report.size}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Magic:</strong>
                    </td>
                    <td>{report.magic}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Reputation:</strong>
                    </td>
                    <td>{report.reputation}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Last Analysis Date:</strong>
                    </td>
                    <td>
                      {new Date(
                        report.last_analysis_date * 1000
                      ).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.chartContainer}>
              <Chart
                type="doughnut"
                data={chartData2}
                options={chartOptions2}
              />
            </div>
          </div>

          <h2 className={styles.he2}>Sandbox analysis results</h2>

          <div className={styles.header1}>
            <div className={styles.chartContainer}>
              <Chart type="doughnut" data={chartData} options={chartOptions} />
            </div>
            <div className={styles.basicProperties}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>Unique Sources:</strong>
                    </td>
                    <td>{report.unique_sources}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Size:</strong>
                    </td>
                    <td>{report.size}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Magic:</strong>
                    </td>
                    <td>{report.magic}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Reputation:</strong>
                    </td>
                    <td>{report.reputation}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>First Submission Date:</strong>
                    </td>
                    <td>
                      {new Date(
                        report.first_submission_date * 1000
                      ).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HashReport;
