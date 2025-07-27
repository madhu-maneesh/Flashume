require("dotenv").config();

const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const fs = require("fs");
const cors=require("cors");

const upload = multer({ dest: "uploads/" });
const app = express();
app.use(cors());

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let lastres="";
let compareres="";

app.post("/upload", upload.single("resume"), async (req, res) => {
  const file = req.file;

  try {
    let extractedText = "";

    if (file.originalname.endsWith(".pdf")) {
      const buffer = fs.readFileSync(file.path);
      const data = await pdfParse(buffer);
      extractedText = data.text;
    } else if (file.originalname.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ path: file.path });
      extractedText = result.value;
    }

    const prompt = `
        You are an advanced ATS and career advisor tool. I will give you the full parsed resume text below. Analyze it and provide your response in **four structured sections** as follows(ecah section is of atmost one line looks good and worthy):

        1. **ATS Score**:
        - Give a score out of 100 based on how well this resume might perform in a standard Applicant Tracking System.
        - Mention whether the score is "Safe", "Moderate", or "Needs Improvement".

        2. **Suggestions to Improve Resume**:
        - Give up to 5 actionable suggestions to improve the resume based on common industry standards (e.g., keywords, formatting, clarity).

        3. **Personalized Career Path Suggestions**:
        - Based on the candidate's skills, education, and experience, suggest suitable roles and a possible career growth path.

        4. **Career Gap or Skill Gap Analysis**:
        - Identify any noticeable career or skill gaps.
        - Suggest any **courses, certifications, or platforms** that can help bridge these gaps (if available in the resume).
        - If nothing is mentioned, skip this section silently.

        Here is the resume text:

        ${extractedText}
        `;
        const model = genAI.getGenerativeModel({model: "gemini-1.5-flash" }); //  gemini-1.5-flash

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        lastres=responseText;

        // console.log("Gemini Response:", responseText);
        res.status(200).json({ result: responseText });
       
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Text extraction failed" });
  }
});

app.post("/compare", upload.fields([{ name: "resume1" }, { name: "resume2" }]),async (req, res) => {
  const file1 = req.files.resume1?.[0];
  const file2 = req.files.resume2?.[0];

  if (!file1 || !file2) {
    return res.status(400).json({ error: "Both resumes required" });
  }

  try {
    let extractedText1 = "";
    let extractedText2 = "";


    if (file1.originalname.endsWith(".pdf")) {
      const buffer = fs.readFileSync(file1.path);
      const data = await pdfParse(buffer);
      extractedText1 = data.text;
    } else if (file1.originalname.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ path: file1.path });
      extractedText1 = result.value;
    }


      if (file2.originalname.endsWith(".pdf")) {
      const buffer = fs.readFileSync(file2.path);
      const data = await pdfParse(buffer);
      extractedText2 = data.text;
    } else if (file2.originalname.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ path: file2.path });
      extractedText2 = result.value;
    }


const prompt = `
You are an advanced ATS resume comparison tool. 

Compare the two parsed resumes below and output the analysis in **only the following 4 sections — nothing else should be included**:

1. similarity_score:Give a percentage (e.g., 75%) representing how similar the resumes are in content, skills, and structure.

2. missing_skills: List the skills that exist in one resume but are missing in the other. Mention which resume is missing what.

3. section_mismatches: Identify missing or mismatched sections (like Experience, Projects, Certifications) between the two resumes.

Respond using Markdown with only 3 headers:
1.similarity_score
2.missing_skills
3.section_mismatches

Here is Resume 1:
${extractedText1}

Here is Resume 2:
${extractedText2}
`;


   


     const model = genAI.getGenerativeModel({model: "gemini-1.5-flash" }); //  gemini-1.5-flash

        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        compareres=responseText;

      res.status(200).json({ result: responseText });
       
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Text extraction failed" });
  }

});

app.get("/results",(req,res)=>{
   res.send(lastres);
})

app.get("/compareresults",(req,res)=>{
   res.send(compareres);
})

const port = 5000;
app.listen(port, () => {
  console.log(` Server running at http://localhost:${port}`);
});


