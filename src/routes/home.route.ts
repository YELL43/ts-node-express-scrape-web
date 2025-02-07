import axios from 'axios';
import { Router } from 'express';
import * as cheerio from 'cheerio';
import { AppDataSource } from '../database/connection';
import { LottoResult } from '../entities/LottoResult.entity';
import { IRequest } from '../types/types';

const router = Router();

router.get('/data', async (req, res) => {
  try {
    const results = await AppDataSource.getRepository(LottoResult).find();
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while fetching data');
  }
});

router.get('/scrape', async (req: IRequest, res: any) => {
  try {
    const response = await axios.get('https://news.sanook.com/lotto/');
    if (response.status !== 200) {
      return res.status(response.status).send('Invalid URL');
    }

    const html = response.data;
    const $ = cheerio.load(html);

    const data: LottoResult[] = [];

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

      const lottoResult = new LottoResult();
      lottoResult.title = title;
      lottoResult.date = date;
      lottoResult.firstPrize = firstPrize;
      lottoResult.threeFront = threeFront;
      lottoResult.threeBack = threeBack;
      lottoResult.twoBack = twoBack;
      lottoResult.titleFirstPrize = titleFirstPrize;
      lottoResult.titleThreeFront = titleThreeFront;
      lottoResult.titleThreeBack = titleThreeBack;
      lottoResult.titleTwoBack = titleTwoBack;

      data.push(lottoResult);
    });

    await AppDataSource.getRepository(LottoResult).save(data);

    res.send('Data scraped and saved to database');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while scraping');
  }
});


export default router;
