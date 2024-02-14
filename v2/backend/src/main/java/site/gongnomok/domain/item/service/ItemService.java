package site.gongnomok.domain.item.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import site.gongnomok.domain.item.dto.api.itemlist.ItemListRequestServiceDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemListResponseDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemResponseDto;
import site.gongnomok.domain.item.dto.service.ItemCreateServiceDto;
import site.gongnomok.domain.item.dto.service.ItemRequiredServiceDto;
import site.gongnomok.domain.item.dto.service.ItemStatusServiceDto;
import site.gongnomok.domain.item.repository.ItemRepository;
import site.gongnomok.global.entity.Item;
import site.gongnomok.global.entity.enumerate.Category;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final ObjectMapper mapper;

    public void saveItem(ItemCreateServiceDto dto) {
        Long itemId = dto.getId();
        String itemName = dto.getName();
        ItemRequiredServiceDto required = dto.getRequired();
        Category category = dto.getCategory();
        ItemStatusServiceDto status = dto.getStatus();
        int upgradableCount = dto.getUpgradableCount();
        Item newItem = null;
        try {
            newItem = Item.builder()
                    .id(itemId)
                    .name(itemName)
                    .requiredLevel(required.getLevel())
                    .requiredStr(required.getStr())
                    .requiredDex(required.getDex())
                    .requiredInt(required.getIntel())
                    .requiredLuk(required.getLuk())
                    .requiredPop(required.getPop())
                    .requiredJob(required.getJob())
                    .category(category)
                    .str(mapper.writeValueAsString(status.getStr()))
                    .dex(mapper.writeValueAsString(status.getDex()))
                    .intel(mapper.writeValueAsString(status.getIntel()))
                    .luk(mapper.writeValueAsString(status.getLuk()))
                    .phyAtk(mapper.writeValueAsString(status.getPhyAtk()))
                    .mgAtk(mapper.writeValueAsString(status.getMgAtk()))
                    .phyDef(mapper.writeValueAsString(status.getPhyDef()))
                    .mgDef(mapper.writeValueAsString(status.getMgDef()))
                    .hp(mapper.writeValueAsString(status.getHp()))
                    .mp(mapper.writeValueAsString(status.getMp()))
                    .upgradable(upgradableCount)
                    .build();
        } catch (JsonProcessingException e) {
            throw new RuntimeException("아이템 정보를 JSON으로 매핑할 수 없습니다.", e);
        }

        itemRepository.save(newItem);
    }

    public ItemListResponseDto findItems(ItemListRequestServiceDto dto) {
        List<ItemResponseDto> items = itemRepository.findItems(dto);
        return ItemListResponseDto.of(items);
    }
}
