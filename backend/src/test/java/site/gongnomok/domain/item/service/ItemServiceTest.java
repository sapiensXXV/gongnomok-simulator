package site.gongnomok.domain.item.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.domain.item.dto.ItemRankingResponse;
import site.gongnomok.domain.item.dto.api.ItemDetailResponseDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemListRequestServiceDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemListResponseDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemResponseDto;
import site.gongnomok.domain.item.dto.service.ItemCreateServiceDto;
import site.gongnomok.domain.item.dto.service.ItemRequiredJobServiceDto;
import site.gongnomok.domain.item.dto.service.ItemRequiredServiceDto;
import site.gongnomok.domain.item.dto.service.ItemStatusServiceDto;
import site.gongnomok.domain.item.repository.ItemRepository;
import site.gongnomok.global.entity.Item;
import site.gongnomok.global.entity.enumerate.AttackSpeed;
import site.gongnomok.global.entity.enumerate.Category;
import site.gongnomok.global.entity.enumerate.Job;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
@Transactional
class ItemServiceTest {

    @Autowired
    public ItemService itemService;

    @Autowired
    public ItemRepository itemRepository;

    @Test
    @DisplayName("아이템 저장")
    void saveItemTest() {
        //given
        String testItemName = "testItemName";

        ItemRequiredJobServiceDto jobDto = ItemRequiredJobServiceDto.builder()
            .common(true)
            .warrior(true)
            .bowman(true)
            .magician(true)
            .thief(true)
            .build();

        ItemRequiredServiceDto requiredDto = ItemRequiredServiceDto.getAllZeroDto();
        ItemStatusServiceDto statusDto = ItemStatusServiceDto.makeAllZero();

        ItemCreateServiceDto itemCreateDto = ItemCreateServiceDto.builder()
            .id(Long.MAX_VALUE)
            .name(testItemName)
            .requiredJob(jobDto)
            .required(requiredDto)
            .category(Category.ALL)
            .status(statusDto)
            .upgradableCount(7)
            .attackSpeed(AttackSpeed.NORMAL)
            .knockBackPercent(0)
            .build();

        //when
        itemService.saveItem(itemCreateDto);
        Optional<Item> findItem = itemRepository.findById(Long.MAX_VALUE);

        //then
        assertThat(findItem).isNotEmpty();
        assertThat(findItem.get().getName()).isEqualTo(testItemName);

    }

    @Test
    @DisplayName("조건 아이템 조회")
    void find_items_by_condition() {

        String ITEM_NAME = "Test Item Name";


        for (int i = 1; i <= 20; i++) {
            ItemCreateServiceDto createDto = ItemCreateServiceDto.builder()
                .id(Long.MAX_VALUE - i)
                .name(ITEM_NAME + i)
                .requiredJob(
                    ItemRequiredJobServiceDto.builder()
                        .common(false)
                        .warrior(true)
                        .bowman(false)
                        .magician(false)
                        .thief(false)
                        .build()
                )
                .required(
                    ItemRequiredServiceDto.builder()
                        .level(40).str(0).dex(0).intel(0).luk(0).pop(0)
                        .build()
                )
                .category(Category.ONE_HANDED_SWORD)
                .status(ItemStatusServiceDto.makeAllZero())
                .attackSpeed(AttackSpeed.NORMAL)
                .knockBackPercent(0)
                .build();

            itemService.saveItem(createDto);
        }

        ItemListRequestServiceDto cond = ItemListRequestServiceDto.builder()
            .category(Category.ONE_HANDED_SWORD)
            .job(Job.WARRIOR)
            .minLevel(40)
            .name(ITEM_NAME)
            .build();

        PageRequest pageRequest = PageRequest.of(0, 20);

        ItemListResponseDto findResults = itemService.findItemsWithCondition(cond, pageRequest);
        List<ItemResponseDto> items = findResults.getItems();

        assertThat(items).hasSize(20);
    }

    @Test
    @DisplayName("아이템 랭킹 조회")
    void find_item_ranking() {

        //given
        int PAGE_SIZE = 5;

        //when
        PageRequest pageRequest = PageRequest.of(0, PAGE_SIZE);
        List<ItemRankingResponse> ranking = itemService.itemRankingPagination(pageRequest);

        //then
        assertThat(ranking).hasSize(PAGE_SIZE);
    }

//    @Test
//    @DisplayName("id로 아이템 찾기")
//    void find_item_by_id() throws JsonProcessingException {
//        String ITEM_NAME = "Test Item Name";
//        Long ITEM_ID = Long.MAX_VALUE;
//
//        ItemCreateServiceDto createDto = ItemCreateServiceDto.builder()
//            .id(ITEM_ID)
//            .name(ITEM_NAME)
//            .requiredJob(
//                ItemRequiredJobServiceDto.builder()
//                    .common(false)
//                    .warrior(true)
//                    .bowman(false)
//                    .magician(false)
//                    .thief(false)
//                    .build()
//            )
//            .required(
//                ItemRequiredServiceDto.builder()
//                    .level(40).str(0).dex(0).intel(0).luk(0).pop(0)
//                    .build()
//            )
//            .category(Category.ONE_HANDED_SWORD)
//            .status(ItemStatusServiceDto.makeAllZero())
//            .attackSpeed(AttackSpeed.NORMAL)
//            .knockBackPercent(0)
//            .build();
//
//        itemService.saveItem(createDto);
//        ItemDetailResponseDto findItem = itemService.findItemById(ITEM_ID);
//
//        assertThat(findItem.getName()).isEqualTo(ITEM_NAME);
//        assertThat(findItem.getCategory()).isEqualTo(Category.ONE_HANDED_SWORD);
//        assertThat(findItem.getAttackSpeed()).isEqualTo(AttackSpeed.NORMAL);
//    }

}