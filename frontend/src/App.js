import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import ResultPage from "./Result";
import LoopIcon from "@mui/icons-material/Loop";
import "./Upload.css";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (file, language) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", language);

    setLoading(true); // Start loading animation

    try {
      const response = await axios.post(
        "https://rpsat-1.vercel.app/summarize",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data);
      setResult(response.data);
      navigate("/result");
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <UploadPage onFileUpload={handleFileUpload} loading={loading} />
        }
      />
      <Route path="/result" element={<ResultPage result={result} />} />
    </Routes>
  );
}

function UploadPage({ onFileUpload, loading }) {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("en");

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleLanguageChange = (e) => setLanguage(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) onFileUpload(file, language);
    else alert("Please select a file first.");
  };

  return (
    <div className="upload-container">
      <h1 class="title">Research Paper Summarizer and Translator</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <select value={language} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="zh-CN">Chinese</option>
          <option value="hi">Hindi</option>
          <option value="ml">Malayalam</option>
          <option value="te">Telugu</option>
          <option value="ta">Tamil</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          style={{
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "7%",
            borderRadius: "5px",
          }}
        >
          {loading ? (
            <>
              <LoopIcon
                style={{
                  marginRight: "5px",
                  animation: "spin 1s linear infinite",
                }}
              />{" "}
              Summarizing...
            </>
          ) : (
            "Upload and Summarize"
          )}
        </button>
      </form>
    </div>
  );
}

export default App;
