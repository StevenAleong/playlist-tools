//import { Commit } from 'vuex'
import * as types from '../../mutation-types'

interface ExternalUrls {
    spotify: string;
}

interface Followers {
    href?: any;
    total: number;
}

interface Image {
    height?: any;
    url: string;
    width?: any;
}

export interface UserProfile {
    country: string;
    display_name: string;
    email: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

const initState: UserProfile = {
    country: '',
    display_name: '',
    email: '',
    external_urls: {
        spotify: ''
    },
    followers: {
        total: 0
    },
    href: '',
    id: '',
    images: [],
    product: '',
    type: '',
    uri: ''
}

const getters = {
    getDisplayName (state: UserProfile) {
        return state.display_name
    },

    getId (state: UserProfile) {
        return state.id
    },

    getUserImage (state: UserProfile) {
        var output = ''

        if (state.images && state.images.length > 0) {
            output = state.images[0].url
        }

        return output
    }
}

const actions = {
    // getAllProducts(context: ActionContextBasic) {
    //   shop.getProducts((products: Product[]) => {
    //     const payload: ProductsPayload = {
    //       products,
    //     }
    //     context.commit(types.RECEIVE_PRODUCTS, payload)
    //   })
    // },
}

const mutations = {
    [types.SET_USER_PROFILE](state: UserProfile, payload: UserProfile) {
        state = payload
    },
}

export default {
    namespaced: true,
    state: () => initState,
    getters,
    actions,
    mutations,
}