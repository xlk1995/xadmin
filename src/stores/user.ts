import { defineStore, acceptHMRUpdate } from "pinia";
// import { ref } from "vue";
export const useUserStore = defineStore("user", () => {
  const count = ref(0);
  const addCount = (num: number = 1) => {
    count.value += num;
  };
  return { addCount, count };
});

// 防止热更新的时候状态丢失问题
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
