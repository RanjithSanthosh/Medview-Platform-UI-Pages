import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export interface PatientInfo {
  name: string;
  id: string;
  gender: string;
  study: string;
  referringDoctor: string;
  patientType: string;
  ageDOB: string;
  modality: string;
  date: string;
}

const formatsList = [
  { label: "CT - Brain (Plain)", value: "ct-brain-plain" },
  { label: "MRI - Spine", value: "mri-spine" },
  { label: "Ultrasound - Abdomen", value: "ultrasound-abdomen" },
];

interface PatientReportProps {
  patient?: PatientInfo; // optional so component can be reused standalone
  onBack?: () => void;
}

const PatientReport: React.FC<PatientReportProps> = ({ patient, onBack }) => {
  const [reportTemplates] = useState<Record<string, string>>({
    "ct-brain-plain": `
<b>CLINICAL HISTORY</b>
<br/><br/>
<b>FINDINGS:</b>
<ul>
<li>No obvious intracranial hemorrhage, mass, mass effect or midline shift.</li>
<li>The cerebral hemispheres and basal ganglia demonstrate normal attenuation without focal abnormality.</li>
<li>The cerebellar hemispheres and brain stem are unremarkable.</li>
<li>The cerebello-pontine angles appear normal.</li>
<li>The ventricles, sulci and basal cisterns are unremarkable.</li>
<li>The calvarium is unremarkable. No obvious fracture.</li>
<li>The mastoid air cells and visualized paranasal sinuses are clear.</li>
</ul>
<b>IMPRESSION:</b><br/>
No intracranial hemorrhage, mass, mass effect or midline shift.
    `,
    "mri-spine": "<b>CLINICAL HISTORY:</b> Spine MRI normal...",
    "ultrasound-abdomen": "<b>CLINICAL HISTORY:</b> Ultrasound abdomen normal...",
  });

  const defaultPatient: PatientInfo = {
    name: patient?.name ?? "Unknown",
    id: patient?.id ?? "-",
    gender: patient?.gender ?? "-",
    study: patient?.study ?? "-",
    referringDoctor: patient?.referringDoctor ?? "Test",
    patientType: patient?.patientType ?? "Outpatient",
    ageDOB: patient?.ageDOB ?? "",
    modality: patient?.modality ?? "-",
    date: patient?.date ?? "",
  };

  const [selectedFormat, setSelectedFormat] = useState<string>("ct-brain-plain");
  const [reportContent, setReportContent] = useState<string>(
    reportTemplates["ct-brain-plain"]
  );

  useEffect(() => {
    // Optional: auto-switch template based on patient study/modality
  }, [patient]);

  const handleFormatChange = (formatValue: string) => {
    setSelectedFormat(formatValue);
    setReportContent(reportTemplates[formatValue] ?? "");
  };

  const handleSave = () => {
    alert("Report saved!");
  };

  const handleSend = () => {
    alert("Report sent!");
  };

  const handlePreview = () => {
    const previewWindow = window.open("", "Preview", "width=900,height=700");
    if (previewWindow) {
      previewWindow.document.open();
      previewWindow.document.write(`
        <html>
          <head>
            <title>Report Preview</title>
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <style>
              body { font-family: Arial, Helvetica, sans-serif; padding: 20px; }
              h1 { font-size: 18px; margin-bottom: 8px; }
            </style>
          </head>
          <body>
            <h1>Patient Report — ${defaultPatient.name} (${defaultPatient.id})</h1>
            <div>${reportContent}</div>
          </body>
        </html>
      `);
      previewWindow.document.close();
    } else {
      alert("Unable to open preview window (popup blocked).");
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      {onBack && (
        <div className="mb-4">
          <button
            onClick={onBack}
            className="text-blue-600 hover:underline"
            title="Back to table"
          >
            ← Back
          </button>
        </div>
      )}

      <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-5 mb-6">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Active Study Detail — <span className="italic">{defaultPatient.name}</span>
        </h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
        <table className="w-full text-sm border-collapse">
          <tbody>
            <tr className="border-b">
              <td className="p-2 font-medium">Patient Name</td>
              <td className="p-2 text-blue-600">{defaultPatient.name}</td>
              <td className="p-2 font-medium">Patient ID</td>
              <td className="p-2">{defaultPatient.id}</td>
              <td className="p-2 font-medium">Age/DOB (YYYYMMDD)</td>
              <td className="p-2">{defaultPatient.ageDOB || "-"}</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Gender</td>
              <td className="p-2">{defaultPatient.gender}</td>
              <td className="p-2 font-medium">Study</td>
              <td className="p-2 text-blue-600">{defaultPatient.study}</td>
              <td className="p-2 font-medium">Modality</td>
              <td className="p-2">{defaultPatient.modality}</td>
            </tr>
            <tr>
              <td className="p-2 font-medium">Referring Doctor</td>
              <td className="p-2">{defaultPatient.referringDoctor}</td>
              <td className="p-2 font-medium">Patient Type</td>
              <td className="p-2">{defaultPatient.patientType}</td>
              <td className="p-2 font-medium">Date</td>
              <td className="p-2 text-blue-600">{defaultPatient.date}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <select
        className="border rounded p-2 mb-4 w-full"
        value={selectedFormat}
        onChange={(e) => handleFormatChange(e.target.value)}
      >
        {formatsList.map((format) => (
          <option key={format.value} value={format.value}>
            {format.label}
          </option>
        ))}
      </select>

      <ReactQuill
        value={reportContent}
        onChange={setReportContent}
        className="bg-white rounded-lg shadow-md mb-4"
        theme="snow"
      />

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
        >
          Save
        </button>
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Send
        </button>
        <button
          onClick={handlePreview}
          className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
        >
          Preview
        </button>
      </div>
    </div>
  );
};

export default PatientReport;
