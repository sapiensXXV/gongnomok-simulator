import { useEffect, useState } from "react";

import RequiredStatus from "../controller/components/RequiredStatus.jsx";
import axios from "axios";

import { BASE_URI } from "../../../../global/uri.js";
import { ATTACK_SPEED, CATEGORY_NAME, DEFAULT_ITEM_RECORD } from "../../../../global/item.js";
import RecordScrollSuccessCount from "./RecordScrollSuccessCount.jsx";
import RecordTitle from "./RecordTitle.jsx";
import RecordItemView from "./RecordItemView.jsx";

export default function BestRecordItem({ itemId, info }) {

  const [enhanced, setEnhanced] = useState(DEFAULT_ITEM_RECORD);
  const status = info?.status;

  useEffect(() => {
    // 기록 아이템 요청
    // 아직 기록이 없을 경우 서버에서 기본 데이터를 넘겨줌
    fetchRecordItem();
  }, [])

  function fetchRecordItem() {
    axios
      .get(`${BASE_URI}/api/item/${itemId}/enhanced`, { withCredentials: true })
      .then((res) => {
        setEnhanced(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function getItemNameColor() {
    const iev = enhanced.iev;
    if (iev >= 0 && iev <= 5) {
      return 'orange';
    } else if (iev >= 6 && iev <= 22) {
      return 'blue';
    } else if (iev >= 23 && iev <= 39) {
      return 'purple'
    } else if (iev >= 40 && iev <= 56) {
      return 'yellow'
    } else if (iev >= 57 && iev <= 73) {
      return 'green'
    } else if (iev > 73) {
      return 'primary-red'
    }

    return 'white';
  }


  return (
    <>
      <main className="item-best-record-root bg-light mx-3 mb-3 py-2 px-3">
        <RecordTitle name={enhanced?.name} />
        <RecordItemView recordInfo={info} enhanceInfo={enhanced} titleColorFunction={getItemNameColor} itemId={itemId} />
        <RecordScrollSuccessCount successInfo={enhanced.success} />
        <span className="item-record-comment">※ 기록은 아이템 정옵 기준으로 등록됩니다</span>
      </main>
    </>
  );
}