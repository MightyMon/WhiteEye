"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./IPReport.module.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { Chart } from "primereact/chart";

const IPReport = () => {
  const searchParams = useSearchParams();
  const ip = searchParams.get("ip");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (ip) {
      fetchReport(ip);
    }
  }, [ip]);

  const fetchReport = async (ip) => {
    setLoading(true);
    setReport(null);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/1` // Replace with your actual API endpoint
      );
      const data = await response.json();
      setReport(data);

      const confirmed = data.userId; // Replace with data.confirmed from your actual API
      var total = data.id;         // Replace with data.total from your actual API
      total = 20;
      const detected = confirmed;
      const notDetected = total - confirmed;

      const chartColor = confirmed > 0 ? "#FF0000" : "#00FF00";
      const hoverColor = confirmed > 0 ? "#FF6347" : "#ADFF2F";

      const chartData = {
        labels: ["Detected", "Not Detected"],
        datasets: [
          {
            data: [detected, notDetected],
            backgroundColor: [chartColor, "#BDBDBD"],
            hoverBackgroundColor: [hoverColor, "#E0E0E0"],
          },
        ],
      };

      const chartOptions = {
        cutout: "60%",
      };

      setChartData(chartData);
      setChartOptions(chartOptions);
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.containerwrap}>
      {loading && <ProgressSpinner />}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {report && (
        <div className={styles.container}>
          <div className={styles.buttonrow}>
            <button className={styles.leftbutton}>
              <i className="pi pi-arrow-left"></i> Go Back
            </button>
            <button className={styles.rightbutton}>
              <i className="pi pi-download"></i> Download report
            </button>
          </div>
          <div>
            <h1 className={styles.ReportHeading}>Report</h1>
          </div>
          <h3>Report for IP: {ip}</h3>
          <pre>{JSON.stringify(report, null, 2)}</pre>
          <div className={styles.header1}>
            <div className={styles.chartContainer}>
              <Chart type="doughnut" data={chartData} options={chartOptions} />
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPReport;
