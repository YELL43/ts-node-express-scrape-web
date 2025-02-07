
import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import * as cheerio from 'cheerio';

// โหลดค่าจากไฟล์ .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://news.sanook.com/lotto/');
    if (response.status !== 200) {
       res.status(response.status).send('Invalid URL');
    }

    const html = response.data;
    const $ = cheerio.load(html);

    const data: any = [];

    const title = $('h1.section__title[itemprop="name"]').text().trim();
    const firstPrize = $('.lotto__number--first').text().trim();
    const threeFront = $('.lotto__number--three').eq(0).text().trim();
    const threeBack = $('.lotto__number--three').eq(1).text().trim();
    const twoBack = $('.lotto__number').eq(2).text().trim();

    data.push({ title, firstPrize, threeFront, threeBack, twoBack });


    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while scraping');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});