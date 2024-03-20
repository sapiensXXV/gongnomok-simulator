package site.gongnomok.domain.item.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.item.dto.ItemRankingResponse;
import site.gongnomok.item.dto.api.itemlist.ItemListRequestServiceDto;
import site.gongnomok.item.dto.api.itemlist.ItemListResponseDto;
import site.gongnomok.item.dto.api.itemlist.ItemResponseDto;
import site.gongnomok.item.dto.service.ItemCreateServiceDto;
import site.gongnomok.item.dto.service.ItemRequiredJobServiceDto;
import site.gongnomok.item.dto.service.ItemRequiredServiceDto;
import site.gongnomok.item.dto.service.ItemStatusServiceDto;
import site.gongnomok.item.domain.repository.ItemRepository;
import site.gongnomok.item.domain.Item;
import site.gongnomok.item.domain.AttackSpeed;
import site.gongnomok.item.domain.Category;
import site.gongnomok.item.domain.Job;
import site.gongnomok.item.service.ItemService;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
@Transactional
class ItemServiceTest {

    @Test
    @DisplayName("아이템 저장")
    void saveItemTest() {
        //given


    }

    @Test
    @DisplayName("조건 아이템 조회")
    void find_items_by_condition() {


    }

    @Test
    @DisplayName("아이템 랭킹 조회")
    void find_item_ranking() {

    }

}