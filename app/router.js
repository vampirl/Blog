module.exports = app => {
  const { router, controller } = app;

  // apps
  router.get('/report(/?)**', controller.home.report);
};
