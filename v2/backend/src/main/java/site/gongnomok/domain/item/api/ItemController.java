package site.gongnomok.domain.item.api;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.gongnomok.domain.item.dto.api.ItemCreateDto;
import site.gongnomok.domain.item.dto.api.ItemDetailResponseDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemListRequestDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemListResponseDto;
import site.gongnomok.domain.item.dto.api.itemlist.ItemResponseDto;
import site.gongnomok.domain.item.service.ItemService;
import site.gongnomok.domain.member.dto.MemberDto;
import site.gongnomok.global.MemberConst;

import java.net.URI;

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

    @GetMapping("/items")
    public ResponseEntity<ItemListResponseDto> items() {
        ItemListResponseDto allItems = itemService.findAllOrderById();

        return ResponseEntity.ok(allItems);
    }

    @PostMapping("/items")
    public ResponseEntity<ItemListResponseDto> searchItems(
        @RequestBody ItemListRequestDto requestDto
    ) {
        log.info("request = {}", requestDto);
        ItemListResponseDto searchResult = itemService.findItems(requestDto.toServiceDto());

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
