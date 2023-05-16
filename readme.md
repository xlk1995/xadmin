## 安装 vite

```
pnpm i vite
```

## 启动 vite

```
npx vite
```

新建一个 index.html， 可以预览到 html 中的内容

```
<body>
    <h1>hello vite</h1>
    <div id="app">hahahaha</div>
</body>
<script src="./src/mian.ts" type="module"></script>
```

src
-- mian.ts
-- add.ts

```
const s: string = 'hello ts'
import { add } from "./add";
console.log(s + add(1,2));
document.querySelector('#app')!.innerHTML = '你好啊，李银河'
```

## 配置 ts-config

遇到的问题：

### 无法加载 path

```
pnpm i @types/node --save-dev
```

### 配置别名的时候编辑器报错

需要配置 tsconfig

```
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "~/*": ["src/*"]
          }
    },

}
```

## 配置 vue

### 1. 安装Vue

```
pnpm i vue
```

需要编译器把 template 转成 render 函数

```
pnpm i @vitejs/plugin-vue
```

### 2. 在vite.config.ts中配置vue

```
import Vue from '@vitejs/plugin-vue'

plugins: [
  // 配置vue的文件
  Vue({
      include: [/\.vue$/]
  })
]
```

## tsconfig.json 的完整配置

```
{
  "compilerOptions": {
    "baseUrl": ".",
    "module": "ESNext",
    "target": "ES2016",
    "lib": ["DOM", "ESNext"],
    "strict": true,
    "esModuleInterop": true,
    "incremental": false,
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "noUnusedLocals": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "types": [
      "vite/client"
      //   "vite-plugin-pages/client",
      //   "vite-plugin-vue-layouts/client"
    ],
    "paths": {
      "~/*": ["src/*"]
    }
  },
  "exclude": ["dist", "node_modules"]
}
```

## 引入 vue 文件编辑器报错需要加入 shims.vue.d.ts

```
// 声明一个模块，用于匹配所有以 ".vue" 结尾的文件
declare module "*.vue" {
  // 从 "vue" 中导入 DefineComponent 类型
  import { DefineComponent } from "vue";

  // 定义一个类型为 DefineComponent 的变量 component
  // 它具有三个泛型参数，分别表示组件的 props、组件的 data 和其他的类型。
  // 在这里，我们使用空对象（{}）表示没有 props，使用空对象（{}）表示没有 data，使用 any 表示其他类型可以是任意值。
  const component: DefineComponent<{}, {}, any>;

  // 导出 component 变量，这样其他地方在导入 ".vue" 文件时，TypeScript 编译器会将它识别为一个 Vue 组件
  export default component;
}

```

## 安装路由

```
pnpm i vue-router
```

### 一个简单的路由

```
const Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/pages/index.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/login.vue"),
    },
  ],
});
```

## pinia

### 安装pinia

```
pnpm i pinia
```

### 导入pinia

```
// 引入Pinia
import {createPinia} from 'pinia'
const pinia = createPinia()
```

### 写一个模块

```
import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
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
```

### 使用

```
import {useUserStore} from '@/stores/user'
const user = useUserStore()
```

```
  <button @click="user.addCount()">{{user.count}}</button>
```

## Unocss

### 安装


```
pnpm i unocss
```

### 配置webpack

```
import Unocss from "unocss/vite";
// 标准预设 支持属性写法 支持图标
import { presetUno, presetAttributify, presetIcons } from "unocss";

Unocss({
  presets: [presetUno(), presetAttributify(), presetIcons()],
}),
```

### 安装图标

```
pnpm i @unocss/preset-icons
```

网站 ![icones](https://icones.js.org/collection/ic)

！未能显示图标 待解决

## 约定编程---零配置开发

约定优于配置

### 文件路由

#### 安装

```
pnpm i vite-plugin-pages    
```

#### 配置

```
import Pages from 'vite-plugin-pages'

// 默认扫描src/pages文件夹
Pages({
    // 配置类型
    extensions: ['vue']
})
```

#### 使用

```
import routes from '~pages'
```

### 自动安装插件

1. 建一个modules文件夹， 创建所需的插件

核心代码

```
// 自动加载
Object.values(import.meta.glob('./modules/*.ts', {eager: true}))
    .forEach((i: any ) => i.install?.({app}))
```

## 按需导入auto-import

### 安装插件

```
pnpm i unplugin-auto-import
```

###  配置

```
import AutoImport from "unplugin-auto-import/vite";

AutoImport({
  imports: ["vue", "vue-router", "pinia"],
  dts: 'src/auto-imports.d.ts'
}),
```

## 自动导入组件

```
pnpm i unplugin-vue-components
```

### 安装

```
pnpm i vite-plugin-vue-layouts
```

### 配置

```
import Components from "unplugin-vue-components/vite"
```

```
Components({
    extensions: ['vue'],
    include: [/\.vue$/],
    dts: 'src/components.d.ts'
})
```
## 布局
### 安装

```
pnpm i vite-plugin-vue-layouts
```

### 配置

```

```


## 国际化

### 安装

```
pnpm i vue-i18n
pnpm i @intlify/vite-plugin-vue-i18n

```

### 配置
```
```


##  路由进度条

```
pnpm i nprogress
```

## 支持暗夜模式

```
pnpm i @vueuse/core @vueuse/head
```

## 自动菜单配置











