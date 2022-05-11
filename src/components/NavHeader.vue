<template>
  <div>
    <b-navbar
      class="my-navbar px-2"
      toggleable="lg"
      type="dark"
      variant="white"
    >
      <div class="navbar__left">
        <b-button
          v-b-toggle.sidebar-no-header
          class="mr-2 sidebar-toggle opacity-5"
          ><font-awesome-icon
            style="width: 20px; height: 20px"
            icon="fa-solid fa-bars"
        /></b-button>
        <div class="navbar__icon">
          <b-icon icon="search" font-scale="2"></b-icon>
        </div>
      </div>
      <div class="navbar__right">
        <div class="wrap pr-5">
          <div class="wrap__date">
            <div><b>Date</b></div>
            <div class="opacity-7">2022 May 08 - 21:20:07 UTC+6</div>
          </div>
          <div class="wrap__icons">
            <div class="wrap__usa mr-2">
              <img
                style="transform: scale(calc(0.9))"
                src="../assets/i.jpg"
                alt="usa"
              />
            </div>

            <div class="megaphone__badge">
              <b-icon
                class="wrap__mega"
                icon="megaphone"
                variant="success"
                font-scale="3"
              ></b-icon>
              <b-badge class="badge-dot" variant="success">.</b-badge>
            </div>
          </div>
        </div>
        <div class="header-btn-lg pl-4">
          <div>
            <div><b>Vladislav Nikulin</b></div>
            <span class="opacity-7">ТОО GSM Kazakhstan</span>
          </div>
          <b-avatar
            size="lg"
            src="	https://dev-cab.pingocean.com/img/avatar.c6deea65.png"
          ></b-avatar>
        </div>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style>
.my-navbar {
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1) !important;
  position: fixed;
  z-index: 50;
  width: 100vw;
}
.navbar__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 50%;
  transform: scale(-1, 1);
}
.wrap__usa {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.06);
  padding: 7px;
  border-radius: 50%;
}
.wrap__usa img {
  display: block;
  max-width: 30px;
  max-height: 30px;
  border-radius: 50%;
}
.megaphone__badge {
  position: relative;
}
.badge-dot {
  color: #28a745 !important;
  font-size: 50% !important;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 !important;
  width: 8px;
  height: 8px;
  border: 1px solid transparent;
  border-radius: 50%;
}
.wrap__mega {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(40, 167, 69, 0.06);
  padding: 10px;
  border-radius: 50%;
}
.wrap {
  display: flex;
  gap: 10px;
}
.bg-primary {
  background-color: #07071f !important;
}
.header-btn-lg {
  position: relative;
  display: flex;
  gap: 20px;
  align-items: center;
}
.header-btn-lg:before {
  position: absolute;
  left: -1px;
  top: 50%;
  background: #dee2e6;
  width: 1px;
  height: 30px;
  margin-top: -15px;
  content: "";
}
.navbar__right {
  display: flex;
  align-items: center;
}
.navbar__left {
  display: flex;
  align-items: center;
}
.wrap__icons {
  display: flex;
  align-items: center;
}
@media (min-width: 992px) {
  .navbar-expand-lg {
    flex-flow: row nowrap;
    justify-content: space-between !important;
  }
}
.sidebar-toggle {
  color: rgba(0, 0, 0, 0.87) !important;
  background-color: #fff !important;
  border: none !important;
}
.btn-secondary:focus,
.btn-secondary.focus {
  box-shadow: none !important;
}
</style>