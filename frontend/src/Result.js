import React from "react";
import { Link } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
import Markdown from "https://esm.sh/react-markdown@9";

function ResultPage({ result }) {
  if (!result) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>No Result Available</h1>
        <Link to="/">Go Back</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Summary</h1>
      <Markdown>{result["Summary"] || "No summary available"}</Markdown>
      <h3>Processing Time</h3>
      <p>{result["Done in: "] || "Unknown time"} seconds</p>
      <Link to="/">Upload Another File</Link>
    </div>
  );
}

export default ResultPage;
