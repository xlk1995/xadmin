<template>
  <main>
    <div class="pt-14 xl:pl-60">
      <div
        class="bg-white text-base dark:bg-gray-800 dark:text-gray-100"
      >
        <navbar></navbar>
        <side-menu></side-menu>
        <div id="main" style="height: calc(100vh - 96px);">
          <router-view />
        </div>
        <footer-content></footer-content>
      </div>
    </div>
  </main>
</template>
