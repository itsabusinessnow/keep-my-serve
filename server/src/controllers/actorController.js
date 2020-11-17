import mongoose from 'mongoose';

const Actor = mongoose.model('Actor');

export async function getActors(req, res) {
  const { organisation, account } = req.params;
  // Handle query parameters
  const isPublic = req.query.isPublic || false;

  const actors = await Actor.find({ organisation, account, public: isPublic });

  return res.json({ actors });
}

export async function getActor(req, res) {
  const { actor, organisation, account } = req.params;
  // Handle query parameters
  const isPublic = req.query.isPublic || false;

  const resActor = await Actor.findOne({
    _id: actor,
    organisation,
    account,
    public: isPublic,
  });
  return res.json({ actor: resActor });
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
