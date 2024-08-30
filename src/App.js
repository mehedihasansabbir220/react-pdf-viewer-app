import React from 'react';
import PDFViewer from './component/PDFViewer';

const App = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '20px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
        }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>PDF Viewer</h2>
            <PDFViewer />
        </div>
    );
};

export default App;