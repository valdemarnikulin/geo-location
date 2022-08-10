<template>
<div @keyup.esc="closeSearch" v-click-outside="closeSearch">
    <div :class="['search-wrapper', searchOpen ? 'isOpen' : '']">
        <div class="input-holder">
            <button class="search-icon" v-on:click="openSearch">
                <b-icon icon="search" font-scale="2">
                </b-icon>
            </button>
        </div>
    </div>
    <transition name="slide-out" appear>
        <template v-if="searchOpen">
            <div class="search-input">
                <input id="search" type="text" :placeholder="whatDoYouWantToSearch" @input="setRequest">
                <div v-if="searchOpen" class="search-input-icon">
                    <font-awesome-icon icon="search"></font-awesome-icon>
                </div>
                <div v-if="searchOpen" class="search-input-close" @click="closeSearch">
                    <font-awesome-icon icon="times"></font-awesome-icon>
                </div>
                <template v-if="request">
                    <div v-if="loading">
                        qwe
                    </div>
                    <b-card class="search-list">
                        <template v-if="results.length">
                            <VuePerfectScrollbar class="scrollbar-container">
                                <b-list-group :flush="true" class="flex-column" style="max-height: calc(100vh - 140px);">
                                    <template v-for="(result, i) in results">
                                        <b-list-group-item :to="result.path" :key="i" @click="onResultClick" class="flex-column align-items-start">
                                            <div class="d-flex align-center mb-2">
                                                <i :class="[result.meta.icon, 'opacity-5 flex-grow-0 mr-2']" style="font-size: 1rem;"></i>
                                            </div>
                                            <div class="d-flex w-100 justify-content-between">
                                                <h5 class="mb-1">{{result.name}}</h5>
                                            </div>
                                        </b-list-group-item>
                                    </template>
                                </b-list-group>
                            </VuePerfectScrollbar>
                        </template>

                        <div v-else>
                            Nothing Found
                        </div>
                    </b-card>
                </template>
            </div>
        </template>
    </transition>
</div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
export default {
    components: {
        VuePerfectScrollbar,
    },
    data() {
        return {
            searchOpen: false,
            request: '',
            results: [],
        }
    },
    updated() {
        let input = document.querySelector('#search');
        if (input) {
            input.focus()
        }
    },
    methods: {
        doSearch() {
            this.searchOpen = false
            this.request = ''
        },
        openSearch() {
            this.searchOpen = true
        },
        closeSearch() {
            this.searchOpen = false
            this.request = ''
        },
        async setRequest(e) {
            this.results = this.$router.options.routes.filter(route => route.path.includes(e.target.value))
            this.request = e.target.value
        },
        onResultClick() {
            this.closeSearch()
        }
    }
}
</script>

<style lang="scss">
.search-icon {
    height: 50px;
    width: 50px;
    border: 0;
    border-radius: 50%;
}

.search-input {
    position: absolute;
    top: 0;
    transform: translate(-6.5%, 0px);

    height: 60px;
    width: 100%;

    background-color: #fff;
    z-index: 1000;
    box-shadow: -8px 12px 18px 0 rgb(25 42 70 / 13%);

    input {
        width: 100%;
        padding: 1.5rem 3.6rem;
        outline: none;
    }

    .search-list {
        margin: 20px;
    }

    &-close {
        z-index: 1001;
        position: absolute;
        right: 2rem;
        top: 32%;
        cursor: pointer;
    }

    &-icon {
        z-index: 1002;
        position: absolute;
        left: 1.5rem;
        top: 37%;
        cursor: pointer;
        color: #0e0f3e;
    }
}

.closed-sidebar .search-input {
    width: calc(100% - 80px);
    left: 80px;
}

@media (max-width: 991px) {
    .search-wrapper.isOpen {
        display: none;
    }

    .search-list {
        position: fixed;
    }

    .search-input {
        left: 0 !important;
        width: 100% !important;
        margin-left: 80px;
    }

}
</style>
