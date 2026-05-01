import {useEffect, useState, useRef} from "react";

import ItemCondition from "../condition/ItemCondition";
import ItemList from "../item_list/ItemList";
import axios from "axios";

import {DEFAULT_FETCH_SIZE} from "../../../global/item";
import {BASE_URL} from "../../../global/uri";
import FeedbackBanner from "../../banner/FeedbackBanner";
import InformBanner from "../../banner/InformBanner";
import {INITIAL_SEARCH_CONDITION} from "../condition/search";
import ItemRanking from "./ItemRanking";
import styles from './ItemMain.module.css'
import RecordItemRanking from "./record_ranking/RecordItemRanking";
import NoticeBanner from "../../banner/NoticeBanner";
import axiosInstance from "../../../global/axiosInstance";
import { RECORD_FEATURE_ENABLED } from "../../../global/featureFlags";

export default function ItemMain() {

  const [itemList, setItemList] = useState([]);
  const [isItemLoaded, setIsItemLoaded] = useState(false);
  const nextPage = useRef(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    searchItems();
  }, []);

  function searchItems() {
    setIsItemLoaded(false);
    axiosInstance
      .get(`${BASE_URL}/api/items?page=0&size=${DEFAULT_FETCH_SIZE}`)
      .then((res) => {
        const items = res?.data?.items;
        if (items === undefined || items === null) {
          setItemList([]);
        } else {
          setItemList(items);
        }
        setIsItemLoaded(true);

        if (res.data.items?.length < DEFAULT_FETCH_SIZE) setHasNextPage(false);
        else setHasNextPage(true);

        nextPage.current += 1
      })
      .catch((err) => {
        console.log(err)
        setItemList([]); // 에러 발생시 아무런 아이템도 나타내지 않는다.
      });
  }

  function searchItemsWithCondition(searchCondition) {
    axiosInstance
      .post(`${BASE_URL}/api/items?page=${nextPage.current}&size=${DEFAULT_FETCH_SIZE}`, searchCondition)
      .then((res) => {
        if (nextPage.current == 0) {
          setItemList([...res.data.items])
        } else {
          setItemList([...itemList, ...res.data.items])
        }
        setIsItemLoaded(true)

        if (res.data.items?.length < DEFAULT_FETCH_SIZE) setHasNextPage(false);
        else setHasNextPage(true);
        nextPage.current += 1
      })
      .catch((err) => {
        console.log(err)
        setItemList([]);
      })
  }

  function doSearch(e, searchCondition) {
    e.preventDefault();
    searchItemsWithCondition(searchCondition);
  }

  function handleMoreItemButton(e, searchCondition) {
    e.preventDefault()
    searchItemsWithCondition(searchCondition);
  }

  const [searchCondition, setSearchCondition] = useState(INITIAL_SEARCH_CONDITION);

  function handleItemNameChange(e) {
    e.preventDefault();
    nextPage.current = 0
    let copy = {...searchCondition};
    copy.name = e.target.value;
    setSearchCondition(copy);
  }

  function handleJobsChange(e, jobName) {
    e.preventDefault();
    nextPage.current = 0;
    let copy = {...searchCondition}
    switch (jobName) {
      case 'warrior':
        copy.jobs.warrior = !copy.jobs.warrior;
        break;
      case 'bowman':
        copy.jobs.bowman = !copy.jobs.bowman;
        break;
      case 'magician':
        copy.jobs.magician = !copy.jobs.magician;
        break;
      case 'thief':
        copy.jobs.thief = !copy.jobs.thief;
        break;
      case 'pirate':
        copy.jobs.pirate = !copy.jobs.pirate;
        break;
    }

    setSearchCondition(copy)
    searchItemsWithCondition(copy);
  }

  function handleMinLevelChange(e) {
    nextPage.current = 0;
    let copy = {...searchCondition};
    copy.minLevel = e.target.value;
    setSearchCondition(copy);
  }

  function handleCategoryChange(e, category) {
    e.preventDefault();
    nextPage.current = 0;
    let copy = {...searchCondition};
    if (copy.category === category) {
      copy.category = "ALL";
    } else {
      copy.category = category;
    }
    setSearchCondition(copy);
    searchItemsWithCondition(copy);
  }

  return (
    <>
      <section className={styles.banner_container}>
        <FeedbackBanner/>
      </section>
      {/* <section className={styles.banner_container}>
        <NoticeBanner />  
      </section> */}
      <section
        className={styles.item_main_container}
        style={{ gridTemplateColumns: '1fr' }}
      >
        <section className={styles.item_condition_and_ranking}>
          <ItemCondition
            searchCondition={searchCondition}
            handleItemNameChange={handleItemNameChange}
            handleJobsChange={handleJobsChange}
            handleCategoryChange={handleCategoryChange}
            handleMinLevelChange={handleMinLevelChange}
            doSearch={doSearch}
          />
          <ItemRanking />
        </section>
        <ItemList
          searchCondition={searchCondition}
          itemList={itemList}
          isItemLoaded={isItemLoaded}
          hasNextPage={hasNextPage}
          handleMoreItemButton={handleMoreItemButton}
        />
        {RECORD_FEATURE_ENABLED && <RecordItemRanking />}
      </section>
    </>
  )
}