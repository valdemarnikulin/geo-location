<template>
<div>
    <div id="nav">
        <router-link to="/registration">Registration</router-link> |
      <router-link to="/authorization">Authorization</router-link>
      <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
    </div>
    <router-view/>
    </div>
</template>