import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import fs from "fs"
import path from "path"

import { createHtmlPlugin } from "vite-plugin-html"
import {
  GROOM_FULLNAME,
  BRIDE_FULLNAME,
  WEDDING_DATE,
  LOCATION,
  WEDDING_DATE_FORMAT,
} from "./src/const"

const distFolder = "build"

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 레포지토리 경로인 서브 디렉터리를 명확하게 지정합니다.
  base: "/HJs_wedding/",

  plugins: [
    react(),
    svgr(),
    createHtmlPlugin({
      inject: {
        data: {
          GROOM_FULLNAME,
          BRIDE_FULLNAME,
          DESCRIPTION: `${WEDDING_DATE.format(WEDDING_DATE_FORMAT)} ${LOCATION}`,
        },
      },
    }),
    {
      name: "manifest-inject",
      // writeBundle 대신 closeBundle을 사용하여 모든 빌드가 완료된 후 안전하게 파일을 덮어씁니다.
      closeBundle() {
        const manifestPath = path.resolve(__dirname, "public/manifest.json")
        const targetPath = path.resolve(__dirname, `${distFolder}/manifest.json`)

        if (fs.existsSync(manifestPath)) {
          const content = fs.readFileSync(manifestPath, "utf-8")
          const processed = content
            .replace(/<%= GROOM_FULLNAME %>/g, GROOM_FULLNAME)
            .replace(/<%= BRIDE_FULLNAME %>/g, BRIDE_FULLNAME)

          // 빌드 폴더가 존재하는지 확인 후 안전하게 파일 생성
          if (!fs.existsSync(path.dirname(targetPath))) {
            fs.mkdirSync(path.dirname(targetPath), { recursive: true })
          }
          fs.writeFileSync(targetPath, processed)
        }
      },
    },
  ],
  server: { 
    port: 3000 
  },
  build: { 
    outDir: distFolder,
    emptyOutDir: true // 빌드 시 이전 빌드 파편을 깨끗하게 지우고 새로 생성합니다.
  },
})