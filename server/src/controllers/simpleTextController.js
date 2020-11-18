import mongoose from 'mongoose';
import { getTokenInfo } from '../auth/tokenInfo';
import { handleActorOptions } from '../handlers/utility';

const SimpleText = mongoose.model('SimpleText');

export async function getSimpleTexts(req, res) {
  const { organisation, account } = getTokenInfo('');
  // Handle query parameters
  const isPublic = handleActorOptions(req.query.option);
  console.log(isPublic);

  const simpleText = await SimpleText.find({
    organisation,
    account,
    public: { $in: isPublic },
  });

  return res.json({ simpleText });
}

export async function getSimpleText(req, res) {
  const { simpleTextId } = req.params;
  const { organisation, account } = getTokenInfo('');

  const simpleText = await SimpleText.findOne({
    _id: simpleTextId,
    organisation,
    account,
  });
  return res.json({ simpleText });
}

export async function createSimpleText(req, res) {
  const { organisation, account } = getTokenInfo('');
  req.body.organisation = organisation;
  req.body.account = account;

  const simpleText = await new SimpleText(req.body).save();

  return res.json({ simpleText });
}

export async function updateSimpleText(req, res) {
  const { simpleTextId } = req.params;
  const { organisation, account } = getTokenInfo('');
  req.body.organisation = organisation;
  req.body.account = account;

  const simpleText = await SimpleText.findOneAndUpdate(
    { _id: simpleTextId, organisation, account }, // Only allow updates on actors in the same org and account
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).exec();

  if (simpleText) return res.json({ simpleText });

  return res.status(404).json({ message: 'SimpleText could not be found' });
}

export async function deleteSimpleText(req, res) {
  const { simpleTextId } = req.params;
  const { organisation, account } = getTokenInfo('');

  const simpleText = await SimpleText.deleteOne(
    { _id: simpleTextId, organisation, account } // Only allow updates on actors in the same org and account
  ).exec();

  if (simpleText) return res.json({ simpleText });

  return res.status(404).json({ message: 'SimpleText could not be found' });
}

export function currentlyNotSupported(req, res) {
  return res
    .status(404)
    .json({ error: `The path '${req.route.path}' is currently not supported` });
}

export function defaultIsPublic(req, res, next) {
  req.query.isPublic = true;
  return next();
}
