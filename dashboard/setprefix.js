const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));

// Define the path to your views directory
const viewsPath = path.join(__dirname, 'dashboard', 'views');

// Route to render the dashboard HTML form
app.get('/dashboard', (req, res) => {
  // Render your dashboard HTML with the form
  res.sendFile(path.join(viewsPath, 'dashboard.ejs'));
});

// Route to handle prefix update
app.post('/dashboard/setprefix', (req, res) => {
  const { prefix } = req.body;

  // Validate the prefix (if needed)

  // Store the prefix in a JSON file (e.g., config.json)
  const configFile = path.join(__dirname, 'botconfig', 'config.json');
  const configData = {
    prefix: prefix
  };

  // Write the updated prefix to the JSON file
  fs.writeFile(configFile, JSON.stringify(configData), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error updating prefix');
    }

    // Success response
    return res.send('Prefix updated successfully');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
