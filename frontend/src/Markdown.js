import React from "react";
import ReactMarkdown from "react-markdown";

function MarkdownDisplay({ markdownText }) {
  return (
    <div style={{ padding: "20px" }}>
      <ReactMarkdown>{markdownText}</ReactMarkdown>
    </div>
  );
}

export default MarkdownDisplay;
