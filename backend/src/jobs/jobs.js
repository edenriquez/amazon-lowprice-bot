var errors = require('../services/errors')
const kue = require("kue");
import {
  Job,
  DoneCallback
} from 'kue';
import {
  scrapProduct
} from './product';

const PRIORITY_HIGH = "high"


module.exports.generateProduct = async (req, res) => {
  // queue setup
  let message;
  const queue = kue.createQueue()
  const productName = req.body.name || '[new product]'
  const queueName = `PROD/${productName}`
  const description = `Attemp to scrap product ${productName}`
  const url = req.body.url;
  const category = req.body.category;
  process.env.GENERATED_WITH_KUE = true;
  // queue creation
  queue.create(description, {
      title: queueName,
      data: {
        url,
        category
      }
    })
    .priority(PRIORITY_HIGH)
    .save()

  // queue process
  queue.process(description, async (Job, DoneCallback) => {
    scrapProduct(url, category, '')
      .then((res) => {
        if (res) {
          DoneCallback(res)
        }
      }).catch((err) => {
        // TODO: treat this case to report to some tool
        console.log('ERROR EXECUTING JOB', err);
      })

  });
  message = "job successfully created"
  res.status(200).json({
    "message": message
  });
}

/**
 * scrapCategory should create jobs based on requests made by users 
 * in order to create tasks that will scrap pages
 * 
 * @params category
 * @params url
 */
module.exports.scrapCategory = async (req, res) => {
  let status = 401
  let message;
  let job;
  const queue = kue.createQueue()

  // MOVE THIS CODE TO CATEGORY/NEW ENDPOINT
  // let category = await models.Category.findByName({
  //   name: req.body.category
  // })

  // CHECK IF JOB ALREADY EXIST
  message = "job already exists"
  if (!job) {
    const queueName = `CAT/${category.name}`
    const description = `Attemp to scrap AWS ${category.name}`
    const data = req.body.url
    status = 200
    queue.create(description, {
        title: queueName,
        data: data
      })
      .priority(PRIORITY_HIGH)
      .save()

    queue.process(description, (
      Job,
      DoneCallback
    ) => {
      console.log("URL TO SCRAP", Job.data.data)
      DoneCallback()
    });
    message = "job successfully created"
  }

  res.status(status).json({
    "message": message
  });
}