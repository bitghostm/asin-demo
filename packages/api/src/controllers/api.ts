"use strict";

import { Response, Request, NextFunction } from "express";
import puppeteer from "puppeteer";
import xpath from "xpath";
import request from "request-promise";
import parse5 from 'parse5';
import xmlser from 'xmlserializer';
import xmldom, { DOMParser } from 'xmldom';

export const getApi = async (req: Request, res: Response) => {
    console.time("request");
    const result = await request.get({ uri: "https://www.amazon.com/dp/B002QYW8LW", 
    headers: {
        "ContentType": "text/html", 
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Host': 'www.amazon.com',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
    },
    gzip: true
    });
    console.timeEnd("request");
    
    console.time("parse");
    // parse html string to DOM
    const document = parse5.parse(result);
    const xhtml = xmlser.serializeToString(document);
    const doc = new DOMParser().parseFromString(xhtml);
    const select = xpath.useNamespaces({"x": "http://www.w3.org/1999/xhtml"});

    // const name = xpath.select("//td[contains(text(), 'Product Dimensions')]/following-sibling::td", doc);
    const name = select("//x:td[contains(text(), 'Product Dimensions')]/following-sibling::td[1]", doc);
    console.log('\n\n', name);
    console.timeEnd("parse");




    // console.log(result.match(/Product Dimensions/g));
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
