const mongoose = require("mongoose");

const start = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();
  return session;
};

const commit = async (session) => {
  await session.commitTransaction();
  session.endSession();
};

const rollback = async (session) => {
  await session.abortTransaction();
  session.endSession();
};

module.exports = {
  start,
  commit,
  rollback,
};
