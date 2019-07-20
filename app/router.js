module.exports = app => {
  const { router, controller } = app;
  router.get('/report**', controller.home.report);
  router.get('/api/getDataList', controller.api.getDataList);
  router.get('/api/getdetail/:id',controller.api.getDetail);
  router.all('/api/addBlog',controller.api.addBlog)
};
