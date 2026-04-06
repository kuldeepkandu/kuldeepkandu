"use client";

import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { MdDownload } from "react-icons/md";
import Link from "next/link";

const PDFViewer = ({ pdfUrl, title = "PDF Document", open, onClose }) => {
  const [hasError, setHasError] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center min-h-screen p-4">
      <div className="relative w-full h-[90vh] sm:w-4/5 sm:h-[95vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-900">
          <h2 className="md:text-lg text-sm  font-semibold text-black">{title}</h2>
          <div className="flex gap-3">
            {/* Download Button */}
            <Link
              href={pdfUrl}
              download
              className="flex text-white items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg transition-colors md:text-sm text-xs font-medium"
            >
              <MdDownload className="hover:animate-bounce" />
              Download
            </Link>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              aria-label="Close PDF viewer"
            >
              <IoCloseSharp className="text-xl text-white" />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto bg-gray-100">
          {!hasError ? (
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0`}
              title={title}
              className="w-full h-full border-none"
              onError={() => setHasError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-6 text-center">
              <div className="text-6xl">📄</div>
              <h3 className="text-xl font-semibold text-black">PDF Viewer Not Supported</h3>
              <p className="text-gray-600 max-w-sm">
                Your browser cannot display PDFs in this viewer. Please download the file to view it.
              </p>
              <a
                href={pdfUrl}
                download
                className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-black/80 transition-colors font-medium flex items-center gap-2"
              >
                <MdDownload className="text-lg" />
                Download PDF
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
