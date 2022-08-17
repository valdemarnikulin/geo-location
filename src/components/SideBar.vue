<template>
<div class="wrapper">
    <div id="my-sidebar" class="my-sidebar bg-primary">
        <div style="display: flex; justify-content: center" class="my-4 logo">
            <b-img class="sidebar-links-change" style="width: 200px;" src="https://graphicsfamily.com/wp-content/uploads/edd/2021/07/Free-Car-Logo-Design-Source-PNG-Transparent.png"></b-img>
        </div>
        <div class="p-3">
            <div class="mb-3">
                <ul class="vertical">
                    <li class="nav__link">
                        <div>
                            <router-link class="sidebar-links" to="/">
                                <b-icon font-scale="1.5" icon="house-door" class="mr-2"></b-icon>
                                <div class="sidebar-links-change">
                                    Home
                                </div>
                            </router-link>
                        </div>
                    </li>
                    <li active class="nav__link">
                        <div>
                            <router-link to="/OldTasks" class="sidebar-links">
                                <b-icon font-scale="1.5" icon="eyeglasses" class="mr-2"></b-icon>
                                <div class="sidebar-links-change">
                                    Tasks
                                </div>
                            </router-link>
                        </div>
                    </li>
                    <li class="nav__link">
                        <div>
                            <router-link class="sidebar-links" to="/">
                                <b-icon font-scale="1.5" icon="wallet" class="mr-2">
                                </b-icon>
                                <div class="sidebar-links-change">
                                    Registration or login
                                </div>
                            </router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
        };
    },
    methods: {

    },
    watch: {
        ///set width block when block is open or not
        showSideBar(newValue,) {
            let textLinks = document.getElementsByClassName('sidebar-links-change')
            let sidebar = document.getElementById('my-sidebar')
            if (newValue == true) {
                for (const el of textLinks) {
                    el.style.display = 'none'
                    el.style.opacity = '0'
                }
                sidebar.style.width = '80px'
            } else {
                for (const el of textLinks) {
                    setTimeout(() => {
                        el.style.display = 'block'
                    }, 1000);
                    setTimeout(() => {
                        el.style.opacity = '1'
                    }, 1100);
                }
                sidebar.style.width = '240px'
            }
        },
    },
    computed: {
        showSideBar() {
            return this.$store.state.sidebar.showSideBar
        }
    }
}
</script>

<style lang="scss" scoped>
a {
    color: white !important;
    font-size: 0.94rem;
}

li {
    list-style: none;
}

ul {
    padding-inline-start: 0;
}

.logo {
    min-height: 105px;
}

.vertical {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.sidebar-links {
    display: flex;
    align-items: center;
    gap: 10px;

}

.sidebar-links-change {
    opacity: 1;
    transition: opacity 1s;
}

.nav-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.sidebar-self {
    width: 280px;
}

.my-sidebar {
    width: 240px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 999;
    
    color: #fff;
    transition: width 1s;
}

.wrapper {
    display: flex;
    width: 100%;

}
</style>
