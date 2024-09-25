package site.gongnomok.api.item;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.gongnomok.common.item.dto.ItemDto;
import site.gongnomok.common.item.dto.ItemViewRankingResponse;
import site.gongnomok.common.item.dto.api.itemlist.ItemListResponse;
import site.gongnomok.common.item.dto.request.ItemCreateRequest;
import site.gongnomok.common.item.dto.request.itemlist.ItemListRequest;
import site.gongnomok.common.item.dto.response.recordranking.ItemRecordRankingResponse;
import site.gongnomok.core.auth.AdminAuth;
import site.gongnomok.core.auth.AdminOnly;
import site.gongnomok.core.auth.domain.Accessor;
import site.gongnomok.core.item.ItemService;

import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @PostMapping("/item/new")
    @AdminOnly
    public ResponseEntity<Void> createItem(
        @AdminAuth final Accessor accessor,
        @RequestBody ItemCreateRequest createDto
    ) {
        Long id = createDto.getId();
        itemService.createItem(createDto);
        return ResponseEntity.created(URI.create("/item/" + id)).build();
    }

    @GetMapping("/item/ranking/view_count")
    public ResponseEntity<List<ItemViewRankingResponse>> itemRanking(Pageable pageable) {

        List<ItemViewRankingResponse> result = itemService.itemRankingPagination(pageable);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/item/ranking/record")
    public ResponseEntity<List<ItemRecordRankingResponse>> recordRanking() {
        List<ItemRecordRankingResponse> result = itemService.itemRecordRanking();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/items")
    public ResponseEntity<ItemListResponse> findItems(
        @RequestParam("page") Integer pageNum,
        @RequestParam("size") Integer size
    ) {
        ItemListResponse paginationItems = itemService.findPaginationItems(pageNum, size);
        return ResponseEntity.ok(paginationItems);
    }

    @PostMapping("/items")
    public ResponseEntity<ItemListResponse> searchItems(
        @RequestBody ItemListRequest requestDto,
        Pageable pageable
    ) {
        ItemListResponse searchResult = itemService.findItemsWithCondition(requestDto.toServiceDto(), pageable);
        return ResponseEntity.ok(searchResult);
    }

    @GetMapping("/item/{itemId}")
    public ResponseEntity<ItemDto> item(
        @PathVariable("itemId") Long itemId
    ) {
        final ItemDto findItem = itemService.findItemById(itemId);
        return ResponseEntity.ok(findItem);
    }
    
}
