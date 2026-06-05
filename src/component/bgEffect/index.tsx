import { BGFlower } from "./index_flower"
import { BGSnowy } from "./index_snowy"
import { BG_EFFECT_TYPE } from "../../env"

/**
 * 원하는 배경 효과를 선택합니다.
 * - 'flower': 벚꽃잎 효과
 * - 'snow': 눈송이 효과
 */
export const BGEffect = () => {
  if (BG_EFFECT_TYPE === "snow") return <BGSnowy />
  return <BGFlower />
}
