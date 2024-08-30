import React, { useState } from 'react';
import { Viewer, Worker, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';

const PDFViewer = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const pageNavigationPluginInstance = pageNavigationPlugin();
    const { jumpToPage } = pageNavigationPluginInstance;

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setPdfFile(fileURL);
        }
    };

    const renderPageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => jumpToPage(i - 1)}
                    style={{
                        padding: '5px 10px',
                        margin: '0 5px 5px 0',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Page {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
        }}>
            <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                style={{
                    marginBottom: '20px',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
            />
            <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {renderPageButtons()}
            </div>
            <div style={{
                height: '750px',
                width: '100%',
                maxWidth: '900px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                overflow: 'hidden',
            }}>
                {pdfFile ? (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <Viewer
                            fileUrl={pdfFile}
                            plugins={[pageNavigationPluginInstance]}
                            defaultScale={SpecialZoomLevel.PageFit}
                            onDocumentLoad={(e) => setTotalPages(e.doc.numPages)}
                        />
                    </Worker>
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '20px', color: '#777' }}>
                        No PDF file selected
                    </p>
                )}
            </div>
        </div>
    );
};

export default PDFViewer;