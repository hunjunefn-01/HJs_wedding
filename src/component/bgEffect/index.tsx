import { BGFlower } from "./index_flower"
import { BGSnowy } from "./index_snowy"
import { BG_EFFECT_TYPE } from "../../env"

/**
 * - 'flower': 벚꽃잎 효과
 * - 'snow': 눈송이 효과
 */
export const BGEffect = () => {
  if (BG_EFFECT_TYPE === "snow") return <BGSnowy />
  return <BGFlower />
}
