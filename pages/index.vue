<template>
<div>
    {{testProductStore.message}}
</div>
</template>

<script setup>
import {useProductsStore} from '~/stores/product';

const testProductStore = useProductsStore()
</script>
