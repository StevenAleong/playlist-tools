// https://stackoverflow.com/questions/63999118/how-to-declare-typescript-type-interface-for-custom-meta-fields-in-vue-router-v4

export {}

declare module 'vue-router' {
    interface RouteMeta {
      
      // must be declared by every route
      requiresAuth: boolean,

      title: string
    }
  }