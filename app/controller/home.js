const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async report() {
    await this.ctx.render('report.html');
  }
}

module.exports = HomeController;
