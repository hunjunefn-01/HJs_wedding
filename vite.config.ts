import { defineConfig, loadEnv } from "vite"
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

// 운영 빌드 가드: 필수 환경변수가 비었거나 로컬 주소면 빌드를 중단합니다.
// (빈 값으로 빌드된 결과물이 운영 사이트를 덮어쓰는 사고 방지)
function assertProductionEnv(mode: string) {
  const env = loadEnv(mode, process.cwd(), "VITE_")
  const errors: string[] = []
  const staticOnly = env.VITE_STATIC_ONLY === "true"

  for (const key of ["VITE_NAVER_MAP_CLIENT_ID", "VITE_KAKAO_SDK_JS_KEY"]) {
    if (!env[key]) errors.push(`${key} 값이 비어 있습니다.`)
  }
  if (!staticOnly) {
    const url = env.VITE_SERVER_URL ?? ""
    if (!url) errors.push("VITE_SERVER_URL 값이 비어 있습니다.")
    else if (!url.startsWith("https://") || /localhost|127\.0\.0\.1/.test(url))
      errors.push(`VITE_SERVER_URL이 운영 주소가 아닙니다: ${url}`)
  }

  if (errors.length) {
    throw new Error(
      `[운영 빌드 중단] .env 설정을 확인하세요.\n- ${errors.join("\n- ")}`,
    )
  }
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command === "build") assertProductionEnv(mode)

  return {
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
          const targetPath = path.resolve(
            __dirname,
            `${distFolder}/manifest.json`,
          )

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
      port: 3000,
    },
    build: {
      outDir: distFolder,
      emptyOutDir: true, // 빌드 시 이전 빌드 파편을 깨끗하게 지우고 새로 생성합니다.
    },
  }
})
