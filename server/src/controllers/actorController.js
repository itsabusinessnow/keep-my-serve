import mongoose from 'mongoose';
import { getTokenInfo } from '../auth/tokenInfo';
import { handleActorOptions } from '../handlers/utility';

const Actor = mongoose.model('Actor');

export async function getActors(req, res) {
  const { organisation, account } = getTokenInfo('');
  // Handle query parameters
  const isPublic = handleActorOptions(req.query.option);
  console.log(isPublic);

  const actors = await Actor.find({
    organisation,
    account,
    public: { $in: isPublic },
  });

  return res.json({ actors });
}

export async function getActor(req, res) {
  const { actorId } = req.params;
  const { organisation, account } = getTokenInfo('');

  const actor = await Actor.findOne({
    _id: actorId,
    organisation,
    account,
  });
  return res.json({ actor });
}

export async function createActor(req, res) {
  const { organisation, account } = getTokenInfo('');
  req.body.organisation = organisation;
  req.body.account = account;

  const actor = await new Actor(req.body).save();

  return res.json({ actor });
}

export async function updateActor(req, res) {
  const { actorId } = req.params;
  const { organisation, account } = getTokenInfo('');
  req.body.organisation = organisation;
  req.body.account = account;

  const actor = await Actor.findOneAndUpdate(
    { _id: actorId, organisation, account }, // Only allow updates on actors in the same org and account
    req.body,
    {
      new: true,
      runValidators: true,
    }
  ).exec();

  if (actor) return res.json({ actor });

  return res.status(404).json({ message: 'Actor could not be found' });
}

export async function deleteActor(req, res) {
  const { actorId } = req.params;
  const { organisation, account } = getTokenInfo('');

  const actor = await Actor.deleteOne(
    { _id: actorId, organisation, account } // Only allow updates on actors in the same org and account
  ).exec();

  if (actor) return res.json({ actor });

  return res.status(404).json({ message: 'Actor could not be found' });
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
