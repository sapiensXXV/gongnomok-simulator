package site.gongnomok.domain.item.api;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.gongnomok.domain.item.dto.ItemRankingResponse;
import site.gongnomok.domain.item.dto.api.ItemCreateDto;
import site.gongnomok.domain.item.dto.api.ItemDetailResponseDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemListRequestDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemListResponseDto;
import site.gongnomok.domain.item.service.ItemService;
import site.gongnomok.domain.member.dto.MemberDto;
import site.gongnomok.global.constant.MemberConst;

import java.net.URI;
import java.util.List;

import static site.gongnomok.global.entity.enumerate.Role.USER;

@Slf4j
@CrossOrigin
@RestController
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @GetMapping("/item/new")
    public ResponseEntity<Void> newItem(
            @SessionAttribute(value = MemberConst.loginMember, required = false) MemberDto member
    ) {
        if (member == null) {
            return ResponseEntity.status(401).build();
        }
        if (member.getRole().equals(USER.makeLowerString())) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/item/new")
    public ResponseEntity<Void> createItem(
        @RequestBody ItemCreateDto createDto
    ) {
        Long id = createDto.getId();
        itemService.saveItem(createDto.toServiceDto());
        return ResponseEntity.created(URI.create("/item/" + id)).build();
    }

    @GetMapping("/item/ranking")
    public ResponseEntity<List<ItemRankingResponse>> itemRanking() {

        List<ItemRankingResponse> result = itemService.itemRanking();
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
    public ResponseEntity<ItemDetailResponseDto> item(@PathVariable("itemId") Long itemId) {
        try {
            ItemDetailResponseDto findItem = itemService.findItemById(itemId);
            return ResponseEntity.ok(findItem);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }


}
