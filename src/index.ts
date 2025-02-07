
import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import * as cheerio from 'cheerio';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../page')));

app.get('/data', async (req, res) => {
  try {
    const response = await axios.get('https://news.sanook.com/lotto/');
    if (response.status !== 200) {
       res.status(response.status).send('Invalid URL');
    }

    const html = response.data;
    const $ = cheerio.load(html);

    const data: any = [];

    $('.lotto-check__article').each((index, element) => {
      const title = $(element).find('.lotto-check__title a').text().trim();
      const date = $(element).find('.lotto-check__time').text().trim();
      
      const titleFirstPrize = $(element).find('small.lotto-check__item').eq(0).text().trim();
      const titleThreeFront = $(element).find('small.lotto-check__item').eq(1).text().trim();
      const titleThreeBack = $(element).find('small.lotto-check__item').eq(2).text().trim();
      const titleTwoBack = $(element).find('small.lotto-check__item').eq(3).text().trim();

      const firstPrize = $(element).find('.lotto__number--three').eq(0).text().trim();
      const threeFront = $(element).find('.lotto__number--three').eq(1).text().trim();
      const threeBack = $(element).find('.lotto__number--three').eq(2).text().trim();
      const twoBack = $(element).find('.lotto__number--three').eq(3).text().trim();

      data.push({ title, date, firstPrize, threeFront, threeBack, twoBack, subTitle : {titleFirstPrize,titleThreeFront,titleThreeBack,titleTwoBack} });
    });


    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while scraping');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});