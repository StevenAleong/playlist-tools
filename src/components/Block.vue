<template>
    <div class="rounded overflow-hidden border shadow-md w-full">
        <div class="px-5 py-4">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'Block'
    })
</script>
