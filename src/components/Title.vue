<template>
    <div class="px-4 py-2 bg-blue-600">
        <h1 class="p-0 m-0 text-white">
            {{currentPageTitle($route)}}
        </h1>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
 
    export default defineComponent({
        name: 'Title',
        methods: {
            currentPageTitle: function(routeData) {
                if (routeData.meta.title) {
                    return routeData.meta.title;
                }
                
                return routeData.name;            
            }
        }
    })
</script>

<style>

</style>
