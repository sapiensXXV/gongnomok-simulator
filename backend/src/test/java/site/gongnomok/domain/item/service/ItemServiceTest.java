package site.gongnomok.domain.item.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.item.dto.api.ItemRequiredDto;
import site.gongnomok.item.dto.api.ItemRequiredJob;
import site.gongnomok.item.dto.request.ItemCreateRequest;
import site.gongnomok.item.dto.request.ItemStatusRequest;
import site.gongnomok.item.dto.response.ItemDetailsResponse;
import site.gongnomok.item.domain.AttackSpeed;
import site.gongnomok.item.domain.Category;
import site.gongnomok.item.service.ItemService;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
@Transactional
class ItemServiceTest {

    @Autowired
    ItemService itemService;


    @Test
    @DisplayName("아이템 저장")
    void saveItemTest() {

        //given
        final Long ITEM_ID = Long.MAX_VALUE;
        final String ITEM_NAME = "ITEM_NAME";
        final ItemRequiredJob requiredJob = ItemRequiredJob.makeDefault();
        final ItemRequiredDto requiredDto = ItemRequiredDto.makeDefault();
        final ItemStatusRequest status = ItemStatusRequest.makeDefaultRequest();

        //when
        ItemCreateRequest createRequestDto = ItemCreateRequest.builder()
            .id(ITEM_ID)
            .name(ITEM_NAME)
            .requiredJob(requiredJob)
            .required(requiredDto)
            .category(Category.CLAW.name())
            .status(status)
            .upgradableCount(7)
            .attackSpeed(AttackSpeed.FAST.name())
            .knockBackPercent(0)
            .build();

        itemService.createItem(createRequestDto);
        ItemDetailsResponse findItem = itemService.findItemById(ITEM_ID);

        //then
        assertThat(findItem.getName()).isEqualTo(ITEM_NAME);
        assertThat(findItem.getCategory()).isEqualTo("CLAW");
    }

    @Test
    @DisplayName("조건으로 아이템 조회")
    void find_items_by_condition() {
        //given


        //when
        //then

    }

    @Test
    @DisplayName("아이템 페이지네이션")
    void find_item_pagination() {
        //given
        //when
        //then
    }

    @Test
    @DisplayName("아이템 랭킹 페이지네이션")
    void find_item_ranking_pagination() {
        //given
        //when
        //then
    }

    @Test
    @DisplayName("아이템 ID로 아이템 조회하기")
    void find_item_by_id() {
        //given
        //when
        //then
    }

    @Test
    @DisplayName("존재하지 않는 아이템 ID로 아이템 조회")
    void find_item_by_invalid_id() {
        //given
        //when
        //then
    }
}