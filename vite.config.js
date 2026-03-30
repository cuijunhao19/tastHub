import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // 👇 修复：Rollup 只支持函数写法（替换你的对象写法）
        manualChunks(id) {
          // 把 vue、vue-router、pinia 打包成 vue-vendor.js
          if (
            id.includes("node_modules/vue") ||
            id.includes("node_modules/vue-router") ||
            id.includes("node_modules/pinia")
          ) {
            return "vue-vendor";
          }
          // 可扩展：其他第三方库
          // if (id.includes('node_modules/axios')) {
          //   return 'utils-vendor';
          // }
        },
      },
    },
  },
});
