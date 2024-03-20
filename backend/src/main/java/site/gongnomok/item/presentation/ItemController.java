package site.gongnomok.item.presentation;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.gongnomok.enhanceditem.service.EnhancedItemService;
import site.gongnomok.item.dto.ItemRankingResponse;
import site.gongnomok.item.dto.request.ItemCreateRequest;
import site.gongnomok.item.dto.response.ItemDetailsResponse;
import site.gongnomok.item.dto.api.itemlist.ItemListRequestDto;
import site.gongnomok.item.dto.api.itemlist.ItemListResponseDto;
import site.gongnomok.item.service.ItemService;
import site.gongnomok.member.dto.request.MemberDto;
import site.gongnomok.global.constant.MemberConst;

import java.net.URI;
import java.util.List;

import static site.gongnomok.member.domain.Role.USER;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping("/item/new")
    public ResponseEntity<Void> createItem(
        @RequestBody ItemCreateRequest createDto
    ) {
        Long id = createDto.getId();
        itemService.saveItem(createDto);
        return ResponseEntity.created(URI.create("/item/" + id)).build();
    }

    @GetMapping("/item/ranking")
    public ResponseEntity<List<ItemRankingResponse>> itemRanking(Pageable pageable) {

        List<ItemRankingResponse> result = itemService.itemRankingPagination(pageable);
        return ResponseEntity.ok(result);

    }

    @GetMapping("/items")
    public ResponseEntity<ItemListResponseDto> findItems(Pageable pageable) {
        ItemListResponseDto paginationItems = itemService.findPaginationItems(pageable);
        return ResponseEntity.ok(paginationItems);
    }

    @PostMapping("/items")
    public ResponseEntity<ItemListResponseDto> searchItems(
        @RequestBody ItemListRequestDto requestDto,
        Pageable pageable
    ) {
        ItemListResponseDto searchResult = itemService.findItemsWithCondition(requestDto.toServiceDto(), pageable);
        return ResponseEntity.ok(searchResult);
    }

    @GetMapping("/item/{itemId}")
    public ResponseEntity<ItemDetailsResponse> item(@PathVariable("itemId") Long itemId) {
        try {
            ItemDetailsResponse findItem = itemService.findItemById(itemId);
            return ResponseEntity.ok(findItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
