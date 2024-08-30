import React, { useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const App = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setPdfFile(fileURL);
        }
    };

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '20px',
                    padding: '20px',
                    backgroundColor: '#f9f9f9',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                }}
            >
                <h2 style={{ marginBottom: '20px', color: '#333' }}>Upload and View PDF</h2>
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
                <div
                    style={{
                        height: '750px',
                        width: '100%',
                        maxWidth: '900px',
                        border: '1px solid #ddd',
                        borderRadius: '10px',
                        overflow: 'hidden',
                    }}
                >
                    {pdfFile ? (
                        <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
                    ) : (
                        <p style={{ textAlign: 'center', marginTop: '20px', color: '#777' }}>
                            No PDF file selected
                        </p>
                    )}
                </div>
            </div>
        </Worker>
    );
};

export default App;
