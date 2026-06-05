import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

/**
 * 오시는 길 정보를 표시하는 컴포넌트입니다.
 * 지도와 대중교통, 자가용 이용 방법을 안내합니다.
 *
 * @returns {JSX.Element} 오시는 길 섹션
 */
export const Location = () => {
  return (
    <>
      {/* 지도 및 주소 섹션 */}
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>

      {/* 대중교통 및 자가용 안내 섹션 */}
      <LazyDiv className="card location">
        {/* 대중교통 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
            * 지하철 이용시
            <br />
            지하철 5호선 <b>발산역 3번출구</b>
            <br />
            → 직진 방향 도보 5분
            <br />
            → 스타벅스 입구 왼편 출입구입니다.
          </div>
          <div />
          <div className="content">
            * 버스 이용 시
            <br />
            - <b>발산역.NC백화점</b> 정류장
            <br />
            → 강서05
            <br />
            - <b>발산역 3번출구</b> 정류장
            <br />
            → 1002, 652, 6630, 6632, 6645, 6657, 강서06
            <br />
            - <b>발산역 4번출구</b> 정류장
            <br />
            → 6630, 6712
            <br />
            - <b>발산역(중)</b> 정류장
            <br />
            → 60, 60-3, 601, 605, 654
            <br />
            → 6633, 3000, 3000-1, 6003
            <br />
            * 스타벅스 입구 왼편 출입구입니다.
          </div>
        </div>

        {/* 자가용 안내 */}
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            네이버 지도, 카카오 네비, 티맵 등 이용
            <br />
            → <b>더베뉴지서울</b> 검색
            <br />
            * 주차장 이용 시 웨딩홀과 같은 건물입니다.
          </div>
          <div />
          <div className="content">
            <b>
              ※ 참고 사항입니다.
            </b>
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
