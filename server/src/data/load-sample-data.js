require('dotenv').config({ path: __dirname + '/../../.env' });
import fs from 'fs';

import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URI_DEV);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once
import Organisation from '../models/Organisation';

const organisations = JSON.parse(fs.readFileSync('sample-data/organisation.json', 'utf-8'));

async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  await Organisation.remove();
  console.log('Data Deleted. To load sample data, run\n\n\t npm run load-sample\n\n');
  process.exit();
}

async function loadData() {
  try {
    await Organisation.insertMany(organisations);
    console.log('👍👍👍👍👍👍👍👍 Done!');
    process.exit();
  } catch(e) {
    console.log('\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run flush-sample\n\n\n');
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
