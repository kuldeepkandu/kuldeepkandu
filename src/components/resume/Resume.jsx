"use client";

import { useState } from "react";
import PDFViewer from "./PdfViewer";

const Resume = () => {
  const [open, setOpen] = useState(false);
  const pdfUrl = "/Assets/pdf/Kuldeep(CV).pdf";

  return (
    <>
      {/* Resume Button */}
      <div className="fixed md:right-6 md:top-1/2 top-0 right-1/3 md:-translate-y-1/2 mt-2">
        <button
          onClick={() => setOpen(true)}
          className=" md:w-10 w-20 md:h-32 h-7 bg-white text-black rounded-lg flex items-center justify-center hover:bg-black/60 hover:text-white transition-colors duration-300"
        >
          <span className="md:-rotate-90 font-bold tracking-widest text-xs bg-gradient-to-r from-cyan-400 via-magenta-500 to-green-500 bg-clip-text text-transparent">
            RESUME
          </span>
        </button>
      </div>

      {/* PDF Viewer Modal */}
      <PDFViewer
        pdfUrl={pdfUrl}
        title="Kuldeep CV"
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default Resume;
