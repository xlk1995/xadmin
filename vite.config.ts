import { defineConfig } from "vite";
import path from "path";
import Unocss from "unocss/vite";
// 标准预设 支持属性写法 支持图标
import { presetUno, presetAttributify, presetIcons } from "unocss";
import Vue from "@vitejs/plugin-vue";
// 配置自动导入路由
import Pages from "vite-plugin-pages";

// 自动导入方法
import AutoImport from "unplugin-auto-import/vite";

// 自动导入组件
import Components from "unplugin-vue-components/vite"

// 配置layout
import Layouts from "vite-plugin-vue-layouts";

// 配置VueI18n
import VueI18n from "@intlify/vite-plugin-vue-i18n"


export default defineConfig({
  resolve: {
    // 配置别名
    alias: {
      // 找到当前目录下的src
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    // 配置vue的文件 插件工厂
    Vue({
      include: [/\.vue$/],
    }),
    // 配置Unocss
    Unocss({
      presets: [presetUno(), presetAttributify(), presetIcons()],
    }),
    // 默认扫描src/pages文件夹
    Pages({
      // 配置类型
      extensions: ["vue"],
      exclude: ["**/components/*.vue"]
    }),
    AutoImport({
      imports: ["vue", "vue-router", "pinia", "vue-i18n","@vueuse/core","@vueuse/head"],
      dts: 'src/auto-imports.d.ts',
      vueTemplate: true, // 支持在template中自动导入
      dirs: ['src/composables']
    }),
    // AutoImport({
    //     imports: ["vue", "vue-i18n", 'vue-router',"@vueuse/core","@vueuse/head"],
    //     dts: "src/auto-imports.d.ts",
    //     vueTemplate: true,
    //     dirs: [
    //       'src/composables',
    //       'src/store',
    //     ],
    //   }),
    Components({
        extensions: ['vue'],
        include: [/\.vue$/],
        dts: 'src/components.d.ts',
        dirs: ['src/components', 'src/pages/**/components']
    }),
    Layouts(),
    VueI18n({
        // 自动加载配置文件
        include: [path.resolve(__dirname, 'locales/**')]
    })
  ],
});
