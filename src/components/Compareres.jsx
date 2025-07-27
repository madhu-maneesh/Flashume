import React from "react";

function Compareres() {
  function fetchAndRender() {
    fetch("http://localhost:5000/compareresults")
      .then((res) => res.text())
      .then((data) => {
        const container = document.getElementById("output");

        // Split into 4 sections using "1.", "2.", etc.
        const sections = data.split(/\d\.\s/).filter(Boolean);

        // Render each section as div
        sections.forEach((sec, idx) => {
          const div = document.createElement("div");
          div.className = "card p-3 mb-3 shadow-sm";

          const heading = document.createElement("h5");
          const sectionTitles = [
                        "📈 Similarity Score",
                        "💪 Missing Skills",
                        "🙅‍♂️Section Mismatches",
                        " 💭Suggestions"
                        ];
          heading.textContent = sectionTitles[idx] ||`Section ${idx + 1}`;
          heading.className = "text-primary mb-2";

          const content = document.createElement("p");
          content.textContent = sec.trim();

          div.appendChild(heading);
          div.appendChild(content);
          container.appendChild(div);
        });
      });
  }

  return (
    <div className="container mt-5">
      <h3>Flashume Resume Evaluation</h3>
      <button className="btn btn-dark mt-3" onClick={fetchAndRender}>
        Load Results
      </button>

      <div id="output" className="mt-4"></div>
    </div>
  );
}

export default Compareres;
