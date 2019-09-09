"use strict";

import { Response, Request, NextFunction } from "express";
import osmosis from 'osmosis';
import { Product } from '../models/Product';

export const selectors = {
  rank: [
    "//td[contains(text(), 'Best Sellers')]/following-sibling::td/text()",
    "//b[contains(text(), 'Best Sellers')]/following-sibling::text()",
  ].join('|'),
  dimensions: "//td[contains(text(), 'Product Dimensions')]/following-sibling::td",
  category: "div#wayfinding-breadcrumbs_container li a:first-of-type",
}

export type Result = {
  [key in keyof typeof selectors]: string;
}

function cleanResult(data: Result): Result {
  return {
    ...data,
    rank: data.rank && data.rank.replace(/ \(/g, '')
  }
}

enum ResponseStatuses {
  created = 'created',
  updated = 'updated',
  notFound = 'product not found',
}

export const insertProduct = async (req: Request, res: Response) => {
  const asin = req.params.asin;
  return osmosis.get(`https://www.amazon.com/dp/${asin}`)
    .set(selectors)
    .data(async (result: Result) => {
      const data = { asin, ...cleanResult(result) };
      const existingProduct = await Product.findOne({ asin }).exec();
      if (existingProduct) {
        Object.assign(existingProduct, data);
        await existingProduct.save();
        return res.status(200).send({ status: ResponseStatuses.updated, data });
      } else {
        const product = new Product(data);
        await product.save();
        return res.status(200).send({ status: ResponseStatuses.created, data });
      }
    })
    .error((err) => {
      console.log(err);
      return res.status(400).send({ status: ResponseStatuses.notFound, err});
    });
};

export const listProduct = async (req: Request, res: Response) => {
  const data = await Product.find();
  return res.status(200).send({ data });
}
