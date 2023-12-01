const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 7860;

app.use(express.json());

app.post('/api/cpp', async (req, res) => {
  try {
    const cppCode = req.body.cppCode;

    const response = await axios.post('https://www.online-cpp.com/', {
      cppCode: cppCode,
    });

    const html = response.data;
    const $ = cheerio.load(html);

    const output = $('#term-output').text();

    res.json({ output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
