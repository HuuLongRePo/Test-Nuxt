import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  // other options...
  state: () => ({
    products:[],
    product:{},
    display:false,
    message:"Hello Long Nguyen"


  }),
  getters: {
    //giống computed

  },
  actions: {
    //giống medthod
    
  },
})