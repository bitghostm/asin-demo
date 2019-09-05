"use strict";

import { Response, Request, NextFunction } from "express";
import puppeteer from "puppeteer";
import xpath from "xpath";
import { DOMParser } from "xmldom";
import request from "request-promise";

/**
 * GET /api
 * List of API examples.
 */
export const getApi = async (req: Request, res: Response) => {
    console.time("request");
    const result = await request.get("https://www.amazon.com/dp/B002QYW8LW");
    console.timeEnd("request");
    console.log(result.match(/Product Dimensions/g));
    // const doc = new DOMParser().parseFromString(result);
    // console.log(xpath.select('//body'));
    // console.time('launchBrowser');
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.setRequestInterception(true);

    // page.on('request', (req) => {
    //     if(req.resourceType() === 'image'){
    //         req.abort();
    //     }
    //     else {
    //         req.continue();
    //     }
    // });
    // console.timeEnd('launchBrowser');
    // console.time('pageLoad');
    // await page.goto("https://www.amazon.com/dp/B002QYW8LW");
    // // await page.goto('view-source:https://www.amazon.com/dp/B002QYW8LW', {waitUntil: 'networkidle2'})
    // console.timeEnd('pageLoad');
    // const itemWeightNode = await page.$x("//td[contains(text(), 'Product Dimensions')]/following-sibling::td");

    // const itemWeight = await page.evaluate(element => element.textContent, itemWeightNode[0]);

    // res.status(200).send({ "test": itemWeight });
    res.status(200).send({ test: result });
};
