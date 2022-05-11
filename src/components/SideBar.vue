<template>
  <div>
    <b-sidebar
      id="sidebar-no-header"
      aria-labelledby="sidebar-no-header-title"
      bg-variant="dark"
      text-variant="light"
      no-header
      shadow
    >
      <template #default="{ hide }">
        <div style="display: flex; justify-content: center" class="my-4">
          <b-img
            style="width: 200px; height: 23px"
            src="https://dev-cab.pingocean.com/img/logo.d9ee8fef.svg"
          ></b-img>
        </div>
        <div class="p-3">
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item active @click="hide" class="nav__link"
                ><div>
                  <b-icon icon="house-door" class="mr-2"></b-icon> Home page
                </div>
                <div></div>
              </b-nav-item>
              <b-nav-item active @click="hide" class="nav__link"
                ><div>
                  <b-icon icon="eyeglasses" class="mr-2"></b-icon> Voice Fraud
                  Detection
                </div>
                <font-awesome-icon icon="fa-solid fa-angle-right"
              /></b-nav-item>
              <b-nav-item active @click="hide" class="nav__link"
                ><div>
                  <b-icon icon="chat-left" class="mr-2"></b-icon>
                  SMS Fraud Detection
                </div>
                <font-awesome-icon icon="fa-solid fa-angle-right"
              /></b-nav-item>
              <b-nav-item active @click="hide" class="nav__link"
                ><div>
                  <font-awesome-icon
                    icon="fa-solid fa-tower-broadcast"
                    class="mr-2"
                  />
                  Voice Routes Quality
                </div>
                <font-awesome-icon icon="fa-solid fa-angle-right"
              /></b-nav-item>
              <b-nav-item active @click="hide" class="nav__link"
                ><div>
                  <b-icon icon="chat-left-dots" class="mr-2"></b-icon> SMS
                  Routes Quality
                </div>
                <font-awesome-icon icon="fa-solid fa-angle-right"
              /></b-nav-item>
              <b-nav-item active @click="hide" class="nav__link"
                ><div>
                  <b-icon icon="globe" class="mr-2"></b-icon>
                  eSIM Roaming Testing
                </div>
                <font-awesome-icon icon="fa-solid fa-angle-right"
              /></b-nav-item>
              <b-nav-item active @click="hide" class="nav__link"
                ><div>
                  <b-icon icon="speedometer2" class="mr-2"></b-icon> Data
                  Testing
                </div>
                <font-awesome-icon icon="fa-solid fa-angle-right"
              /></b-nav-item>
              <b-nav-item active @click="hide" class="nav__link"
                ><div><b-icon icon="megaphone" class="mr-2"></b-icon> Spam</div>
                <font-awesome-icon icon="fa-solid fa-angle-right"
              /></b-nav-item>
              <b-nav-item active @click="hide" class="nav__link"
                ><div><b-icon icon="gear" class="mr-2"></b-icon> Settings</div>
                <font-awesome-icon icon="fa-solid fa-angle-right"
              /></b-nav-item>
              <b-nav-item active @click="hide" class="nav__link"
                ><div>
                  <b-icon icon="chat-square-text" class="mr-2"></b-icon> Tickets
                </div>
                <div></div>
              </b-nav-item>
              <b-nav-item active @click="hide" class="nav__link"
                ><div><b-icon icon="wallet" class="mr-2"></b-icon> Billing</div>
                <div></div>
              </b-nav-item>
            </b-nav>
          </nav>
        </div>
        <b-button variant="dark" block @click="hide">Close</b-button>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: "https://dev-cab.pingocean.com/img/logo.d9ee8fef.svg",
    };
  },
};
</script>

<style lang="scss" scoped>
// @import "../assets/icons/custom.scss";
a {
  color: white !important;
}
.nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-self {
  width: 280px;
}
.bg-self {
}
.b-sidebar {
  max-width: 280px !important;
  background-color: #0e0f3e !important;
}
</style>