const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint for data cleansing
app.post('/cleanse-data', (req, res) => {
  const rawData = req.body;

  // Simulate data cleansing
  const cleansedData = rawData.map(item => ({
    ...item,
    error: false, // Assuming errors are corrected
    status: 'Cleansed'
  }));

  res.json({
    message: 'Data cleansed successfully',
    data: cleansedData
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
