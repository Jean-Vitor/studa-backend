module.exports = async function truncate(models) {
  return Promise.all(
    Object.keys(models).map((key) => (
      models[key].destroy({ where: {}, force: true })
    )),
  );
};
