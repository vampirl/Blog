import Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        datalist: [],    //博客列表的数据
        detail: []
    },
    mutations: {
        getdatalist(state,data) {
            state.datalist = data
        },
        getdetail(state,data) {
            state.detail = data
        }
    },
    actions: {
        GETDATALIST({state,commit}) {
            return new Promise((resolve,reject) => {
                axios.get('/api/getDataList').then( res => {
                    commit('getdatalist',res.data)
                    resolve()
                })
                .catch( err => {
                    reject(err);
                })
            })
        },
        GETDETAIL({state,commit},params) {
            const api = '/api/getdetail/' + params.id
            return new Promise((resolve,reject) => {
                axios.get(api).then( res => {
                    commit('getdetail',res.data[0])
                    resolve()
                })
            })
        }
    }
})