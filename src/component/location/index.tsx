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
            * 입구: 스타벅스 매장 왼편입니다.
            <br />
            <br />* 지하철
            <br />- 5호선 <b>발산역 3번 출구</b> 방향 1분 이내
            <br />- 9호선 <b>양천향교역 6번 출구</b> 도보 10분 직진
          </div>
          <div />
          <div className="content">
            * 버스
            <br />- <b>발산역</b> 정류장 하차
            <br />
            지선 6630, 6632, 6642, 6645, 6648, 6657, 6712
            <br />
            간선 601, 605, 652, 654, 661
            <br />
            일반 60, 60-3, 88, 1002
            <br />
            직행 3000, 8000
            <br />
            공항 6003
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
            * 주차장 이용 시 웨딩홀과 같은 건물입니다.
            <br />- 네이버 지도, 카카오 내비, 티맵 등 이용
            <br />→ <b>더베뉴지서울</b> 검색
          </div>
          <div />
          <div className="content">
            <b>※ 참고 사항입니다.</b>
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
