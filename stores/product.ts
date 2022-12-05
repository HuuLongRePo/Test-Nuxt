import { defineStore } from 'pinia'
import { Product } from '@/types/product'


interface ProductState {
  products: Array<Product>;
  product: Product;
  changeheader: string,
  visibledialog: boolean,
  isEdit: boolean,
  visibledialogDelete: boolean
}

export const useProductsStore = defineStore('products', {
  // other options...

  state: (): ProductState => {
    return {
      products: [],
      product: {},
      changeheader: "",
      visibledialog: false,
      isEdit: false,
      visibledialogDelete: false
    }
  },
  actions: {
    //giống medthod
    loadData() {
      return $fetch(`${useRuntimeConfig().public.apiBase}/api/v1/products`)
    },
    createProduct(data: Product) {
      return $fetch(`${useRuntimeConfig().public.apiBase}/api/v1/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).catch((err) => {
        console.log(err);
      });
    },
    updateProduct(data: Product) {
      return $fetch(`${useRuntimeConfig().public.apiBase}/api/v1/products/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).catch((err) => {
        console.log(err);
      });
    },
    deleteProduct(data: Product) {
      return $fetch(`${useRuntimeConfig().public.apiBase}/api/v1/products/${data.id}`, {
        method: "DELETE"
      }).catch((err) => {
        console.log(err);
      });
    },
  }
})