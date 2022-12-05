<template>
    <div>
        <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew"></Button>
        <DataTable :value="products">
            <Column field="name" header="Name Product"></Column>
            <Column field="price" header="Price Product"></Column>
            <Column field="description" header="Decription Product"></Column>
            <Column :exportable="true" style="min-width:8rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                        @click="editProduct(slotProps.data)"></Button>
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
                        @click="confirmDeleteProduct(slotProps.data)"></Button>
                </template>
            </Column>
        </DataTable>
        <Dialog :header="getTitle" v-model:visible="visibledialog" :modal="true">
            <form action="">
                <div class="field">
                    <label for="nameproduct">Name</label>
                    <InputText id="nameproduct" type="text" v-model="product.name" />
                </div>
                <div class="field">
                    <label for="description">Product
                    </label>
                    <InputText id="description" type="text" v-model="product.description" />
                </div>
                <div class="field">
                    <label for="usernpriceame">Price</label>
                    <InputText id="price" type="text" v-model="product.price" />
                </div>
            </form>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" classs="p-button-text" @click="hideDialog"></Button>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct"></Button>
            </template>
        </Dialog>
        <Dialog v-model:visible="visibledialogDelete" :style="{ width: '450px' }" header="Confirm Delete" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"></i>
                <span v-if="product">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text"
                    @click="visibledialogDelete = false"></Button>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProduct"></Button>
            </template>
        </Dialog>

    </div>
</template>

<script>
import { mapActions, mapWritableState } from "pinia";
import { useProductsStore } from "@/stores/product";
export default {
    created() {
        this.fetchData();
    },
    computed: {
        ...mapWritableState(useProductsStore, [
            "products",
            "product",
            "changeheader",
            "visibledialog",
            "isEdit",
            "visibledialogDelete"
        ]),
        getTitle() {
            return this.product.id ? 'Edit Product' : 'Create Product'
        }
    },
    methods: {
        ...mapActions(useProductsStore, [
            "loadData",
            "createProduct",
            "updateProduct",
            "deleteProduct",
        ]),
        hideDialog() {
            if (this.visibledialog) {
                this.visibledialog = false
            } else if (this.visibledialogDelete) {
                this.visibledialogDelete = false
            }
        },
        async saveProduct() {
            if (this.product.id) {
                await this.updateProduct(this.product)
                await this.fetchData()
                await this.hideDialog()
            } else {
                await this.createProduct(this.product)
                await this.fetchData()
                await this.hideDialog()
            }
        },
        async fetchData() {
            const res = await this.loadData()
            this.products = res
        },
        async openNew() {
            this.product = {}
            this.visibledialog = true
        },
        editProduct(data) {
            this.product = { ...data }
            this.visibledialog = true
        },
        confirmDeleteProduct(data) {
            this.visibledialogDelete = true
            this.product = data
        },
        async deleteSelectedProduct() {
            await this.deleteProduct(this.product)
            await this.fetchData()
            await this.hideDialog()
        }
        ,
    },
};
</script>
