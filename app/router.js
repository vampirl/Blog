module.exports = app => {
  const { router, controller } = app;
  router.get('/report(/?)**', controller.home.report);
  router.get('/getDataList', controller.blogList.getDataList);
};
