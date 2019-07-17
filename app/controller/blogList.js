const Controller = require('egg').Controller

class listController extends Controller {
    async getDataList (){
        const ctx = this.ctx 
        const result = await ctx.curl('http://localhost:3000/datalist',{
            dataType: 'json',
            timeout: 3000
        })
        ctx.status = result.status
        ctx.set(result.header)
        ctx.body = result.data
    }
}
module.exports = listController