import React, { useState } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';

const DataCleansingDashboard = () => {
  const [data, setData] = useState([]);
  const [flaggedData, setFlaggedData] = useState([]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const rawData = JSON.parse(e.target.result);
      setData(rawData);
      flagErrors(rawData);
    };

    reader.readAsText(file);
  };

  const flagErrors = (data) => {
    const errors = data.filter(item => item.error); // Flagging condition
    setFlaggedData(errors);
  };

  return (
    <div className="container mt-4">
      <h2>Healthcare Data Cleansing Dashboard</h2>
      <input 
        type="file" 
        accept=".json" 
        onChange={handleUpload} 
        className="form-control my-3" 
      />

      {flaggedData.length > 0 && 
        <Alert variant="danger">Errors Found: {flaggedData.length}</Alert>
      }

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Record Detail</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={item.error ? 'table-danger' : ''}>
              <td>{item.patientId}</td>
              <td>{item.detail}</td>
              <td>{item.error ? 'Flagged' : 'Clean'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DataCleansingDashboard;
