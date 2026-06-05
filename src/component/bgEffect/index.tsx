import { BGFlower } from "./index_flower"
import { BGSnowy } from "./index_snowy"
import { BG_EFFECT_TYPE } from "../../env"

/**
 * - 'flower': 벚꽃잎 효과
 * - 'snow': 눈송이 효과
 */
export const BGEffect = () => {
  // 현재 환경 변수로부터 어떤 값이 들어오는지 브라우저 콘솔에서 확인합니다.
  console.log("현재 설정된 배경 효과:", BG_EFFECT_TYPE);

  if (BG_EFFECT_TYPE === "snow") return <BGSnowy />
  return <BGFlower />
}
