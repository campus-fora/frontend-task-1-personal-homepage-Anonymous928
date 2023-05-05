const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const texts = {};

app.use(bodyParser.json());

// POST request handler
app.post('/texts', (req, res) => {
  const id = req.body.id;
  const text = req.body.text;

  if (!id || !text) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  texts[id] = text;

  return res.status(201).json({ message: 'Text saved successfully' });
});

// GET request handler
app.get('/texts', (req, res) => {
  const textList = [];

  for (const id in texts) {
    textList.push({ id: id, text: texts[id] });
  }

  return res.json(textList);
});

// DELETE request handler
app.delete('/texts/:id', (req, res) => {
  const id = req.params.id;

  if (!texts[id]) {
    return res.status(404).json({ error: `Text with ID ${id} not found` });
  }

  delete texts[id];

  return res.json({ message: 'Text deleted successfully' });
});


const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
