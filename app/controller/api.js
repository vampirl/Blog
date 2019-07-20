const Controller = require('egg').Controller

class api extends Controller {
    async getDataList (){
        const api = this.config.api.url
        const ctx = this.ctx 
        const result = await ctx.curl(api,{
            dataType: 'json',
            timeout: 3000
        })
        ctx.status = result.status
        ctx.set(result.header)
        ctx.body = result.data
    }
    async getDetail () {
        const ctx = this.ctx
        const api = this.config.api.url + `?id=${this.ctx.params.id}`
        const result = await ctx.curl(api,{
            dataType: 'json',
            timeout:  3000
        })
        ctx.status = result.status
        ctx.set(result.header)
        ctx.body = result.data
    }
    async addBlog () {
        const ctx = this.ctx
        const body = ctx.request.body
        const api = this.config.api.url
        const result = await ctx.curl(api,{
            method : 'POST',
            data: {
                title: body.title,
                content: body.content,
                description: body.description
            },
            dataType: 'json'
        })
        ctx.status = result.status
        ctx.set(result.header)
        ctx.body = result.data
    }
}
module.exports = api