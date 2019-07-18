import Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        datalist: []    //博客列表的数据
    },
    mutations: {
        getdatalist(state,data) {
            state.datalist = data
        }
    },
    actions: {
        GETDATALIST({state,commit}) {
            return new Promise((resolve,reject) => {
                axios.get('/getDataList').then( res => {
                    commit('getdatalist',res.data)
                    resolve()
                }).catch( err => {
                    reject(err);
                })
            })
        }
    }
})