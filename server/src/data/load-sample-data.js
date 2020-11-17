import fs from 'fs';

import mongoose from 'mongoose'; // Tell Mongoose to use ES6 promises

// import all of our models - they need to be imported only once
import Organisation from '../models/Organisation';
import Account from '../models/Account';
import Actor from '../models/Actor';
import SimpleText from '../models/SimpleText';

require('dotenv').config({ path: `${__dirname}/../../.env` });

mongoose.connect(process.env.MONGO_URI_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

const organisations = JSON.parse(
  fs.readFileSync('sample-data/organisations.json', 'utf-8')
);
const accounts = JSON.parse(
  fs.readFileSync('sample-data/accounts.json', 'utf-8')
);
const actors = JSON.parse(fs.readFileSync('sample-data/actors.json', 'utf-8'));
const simpleTexts = JSON.parse(
  fs.readFileSync('sample-data/simpleTexts.json', 'utf-8')
);

async function deleteData() {
  console.log('😢😢 Goodbye Data...');
  await Organisation.remove();
  await Account.remove();
  await Actor.remove();
  await SimpleText.remove();
  console.log(
    'Data Deleted. To load sample data, run\n\n\t npm run load-sample\n\n'
  );
  process.exit();
}

async function loadData() {
  try {
    await Organisation.insertMany(organisations);
    await Account.insertMany(accounts);
    await Actor.insertMany(actors);
    await SimpleText.insertMany(simpleTexts);
    console.log('👍👍👍👍👍👍👍👍 Done!');
    process.exit();
  } catch (e) {
    console.log(
      '\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t npm run flush-sample\n\n\n'
    );
    console.log(e);
    process.exit();
  }
}
if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
