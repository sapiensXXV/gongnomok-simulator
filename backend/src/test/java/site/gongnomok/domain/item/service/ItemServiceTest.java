package site.gongnomok.domain.item.service;

import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.global.exception.ItemException;
import site.gongnomok.item.domain.AttackSpeed;
import site.gongnomok.item.domain.Category;
import site.gongnomok.item.domain.Item;
import site.gongnomok.item.domain.repository.ItemRepository;
import site.gongnomok.item.dto.ItemRankingResponse;
import site.gongnomok.item.dto.api.ItemRequiredDto;
import site.gongnomok.item.dto.api.ItemRequiredJob;
import site.gongnomok.item.dto.api.itemlist.ItemListResponse;
import site.gongnomok.item.dto.request.ItemCreateRequest;
import site.gongnomok.item.dto.request.ItemStatusRequest;
import site.gongnomok.item.dto.request.itemlist.ItemListServiceRequest;
import site.gongnomok.item.dto.request.itemlist.JobSearchDto;
import site.gongnomok.item.dto.response.ItemDetailsResponse;
import site.gongnomok.item.service.ItemService;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static site.gongnomok.global.exception.ExceptionCode.NOT_FOUND_ITEM_ID;


@SpringBootTest
@Transactional
class ItemServiceTest {

    @Autowired
    ItemService itemService;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    EntityManager em;

    @Test
    @DisplayName("아이템 저장")
    void saveItemTest() {

        //given
        final Long ITEM_ID = 1L;
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
    @DisplayName("모든 조건이 주어진 경우 아이템 검색")
    @Commit
    void find_items_by_all_condition() {

        //given
        final String ITEM_NAME_PREFIX = "item_";
        final int PAGE_NUMBER = 0;
        final int PAGE_SIZE = 20;

        for (long i = 1; i <= 30; i++) {
            final Long ITEM_ID = i;
            final String ITEM_NAME = ITEM_NAME_PREFIX + i;
            final ItemRequiredJob requiredJob = ItemRequiredJob.makeDefault();
            final ItemRequiredDto requiredDto = ItemRequiredDto.makeDefault();
            final ItemStatusRequest status = ItemStatusRequest.makeDefaultRequest();

            ItemCreateRequest createRequest = ItemCreateRequest.builder()
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
            itemService.createItem(createRequest);
        }

        final ItemListServiceRequest condition = new ItemListServiceRequest(
            Category.CLAW,
            JobSearchDto.allFalse(),
            0,
            ITEM_NAME_PREFIX
        );
        Pageable pageable = PageRequest.of(PAGE_NUMBER, PAGE_SIZE);

        //when
        ItemListResponse searchResult = itemService.findItemsWithCondition(condition, pageable);

        //then
        assertThat(searchResult.getItems()).hasSize(PAGE_SIZE);
        for (int i = 0; i < PAGE_SIZE; i++) {
            assertThat(searchResult.getItems().get(i).getName()).isEqualTo(ITEM_NAME_PREFIX + (i+1));
        }
    }

    @Test
    @DisplayName("카테고리 조건이 없는 경우 아이템 검색")
    void find_items_without_category_condition() {
        //given
        final String ITEM_NAME_PREFIX = "item_";
        final int PAGE_NUMBER = 0;
        final int PAGE_SIZE = 20;

        for (long i = 1; i <= 30; i++) {
            final Long ITEM_ID = i;
            final String ITEM_NAME = ITEM_NAME_PREFIX + i;
            final ItemRequiredJob requiredJob = ItemRequiredJob.makeDefault();
            final ItemRequiredDto requiredDto = ItemRequiredDto.makeDefault();
            final ItemStatusRequest status = ItemStatusRequest.makeDefaultRequest();

            ItemCreateRequest createRequest = ItemCreateRequest.builder()
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
            itemService.createItem(createRequest);
        }

        final ItemListServiceRequest condition = new ItemListServiceRequest(
            null, //카테고리 조건이 null
            JobSearchDto.allFalse(),
            0,
            ITEM_NAME_PREFIX
        );
        Pageable pageable = PageRequest.of(PAGE_NUMBER, PAGE_SIZE);

        //when
        ItemListResponse searchResult = itemService.findItemsWithCondition(condition, pageable);

        //then
        assertThat(searchResult.getItems()).hasSize(PAGE_SIZE);
    }

    @Test
    @DisplayName("직업 조건이 없는 경우 아이템 검색")
    void find_items_without_job_condition() {
//given
        final String ITEM_NAME_PREFIX = "item_";
        final int PAGE_NUMBER = 0;
        final int PAGE_SIZE = 20;

        for (long i = 1; i <= 30; i++) {
            final Long ITEM_ID = i;
            final String ITEM_NAME = ITEM_NAME_PREFIX + i;
            final ItemRequiredJob requiredJob = ItemRequiredJob.makeDefault();
            final ItemRequiredDto requiredDto = ItemRequiredDto.makeDefault();
            final ItemStatusRequest status = ItemStatusRequest.makeDefaultRequest();

            ItemCreateRequest createRequest = ItemCreateRequest.builder()
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
            itemService.createItem(createRequest);
        }

        final ItemListServiceRequest condition = new ItemListServiceRequest(
            Category.CLAW,
            JobSearchDto.allFalse(), // 직업 조건이 null
            0,
            ITEM_NAME_PREFIX
        );
        Pageable pageable = PageRequest.of(PAGE_NUMBER, PAGE_SIZE);

        //when
        ItemListResponse searchResult = itemService.findItemsWithCondition(condition, pageable);


        //then
        assertThat(searchResult.getItems()).hasSize(PAGE_SIZE);
    }

    @Test
    @DisplayName("아이템 랭킹 페이지")
    void find_item_ranking_no_offset_second_page() {
        //given
        final int PAGE_NUMBER = 0;
        final int PAGE_SIZE = 5;
        final int MOST_VIEW_COUNT = 5;

        final String ITEM_NAME_PREFIX = "item_";

        for (long i = 1; i <= 5; i++) {
            final Long ITEM_ID = i;
            final String ITEM_NAME = ITEM_NAME_PREFIX + i;

            final ItemRequiredJob requiredJob = ItemRequiredJob.makeDefault();
            final ItemRequiredDto requiredDto = ItemRequiredDto.makeDefault();
            final ItemStatusRequest status = ItemStatusRequest.makeDefaultRequest();

            ItemCreateRequest createRequest = ItemCreateRequest.builder()
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
            itemService.createItem(createRequest);
        }

        for (long i = 1; i <= MOST_VIEW_COUNT; i++) {
            Item findItem = itemRepository
                .findById(i)
                .orElseThrow(() -> new ItemException(NOT_FOUND_ITEM_ID));
            for (int j = 0; j < i; j++) {
                findItem.addViewCount();
            }
        }

        Pageable pageable = PageRequest.of(PAGE_NUMBER, PAGE_SIZE);

        //when
        List<ItemRankingResponse> result = itemService.itemRankingPagination(pageable);

        //then
        assertThat(result).hasSize(PAGE_SIZE);
        for (int i = 0; i < PAGE_SIZE; i++) {
            ItemRankingResponse response = result.get(i);
            int rank = response.getRank();
            int viewCount = response.getViewCount();

            assertThat(rank).isEqualTo(i + 1);
            assertThat(viewCount).isEqualTo(MOST_VIEW_COUNT - i);
        }

    }



    @Test
    @DisplayName("존재하지 않는 아이템 ID로 아이템 조회")
    void find_item_by_invalid_id() {
        //given
        final Long INVALID_ITEM_ID = Long.MAX_VALUE;

        //then
        assertThatThrownBy(() -> {
                ItemDetailsResponse findItem = itemService.findItemById(INVALID_ITEM_ID);
            })
            .isInstanceOf(ItemException.class);
    }
}