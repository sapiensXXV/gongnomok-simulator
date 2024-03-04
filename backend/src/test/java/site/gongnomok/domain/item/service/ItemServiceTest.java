package site.gongnomok.domain.item.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import site.gongnomok.domain.item.dto.api.ItemDetailResponseDto;
import site.gongnomok.domain.item.dto.service.ItemCreateServiceDto;
import site.gongnomok.domain.item.dto.service.ItemRequiredJobServiceDto;
import site.gongnomok.domain.item.dto.service.ItemRequiredServiceDto;
import site.gongnomok.domain.item.dto.service.ItemStatusServiceDto;
import site.gongnomok.domain.item.repository.ItemRepository;
import site.gongnomok.global.entity.Item;
import site.gongnomok.global.entity.enumerate.AttackSpeed;
import site.gongnomok.global.entity.enumerate.Category;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@Transactional
class ItemServiceTest {

    @Autowired
    public ItemService itemService;

    @Autowired
    public ItemRepository itemRepository;

    @Test
    @DisplayName("아이템을 저장한다.")
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
        ItemStatusServiceDto statusDto = ItemStatusServiceDto.geAllZeroDto();

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

}