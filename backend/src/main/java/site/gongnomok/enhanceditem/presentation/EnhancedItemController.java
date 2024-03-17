package site.gongnomok.enhanceditem.presentation;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.gongnomok.enhanceditem.dto.UpdateEnhancementResponse;
import site.gongnomok.enhanceditem.service.EnhancedItemService;
import site.gongnomok.item.dto.ItemEnhanceRequest;
import site.gongnomok.item.dto.ItemEnhanceResponse;

@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class EnhancedItemController {

    private final EnhancedItemService enhancedItemService;


    @GetMapping("/item/{itemId}/enhanced")
    public ResponseEntity<ItemEnhanceResponse> enhancedItem(
        @PathVariable("itemId") Long itemId
    ) {
        ItemEnhanceResponse result = enhancedItemService.findEnhanceItem(itemId);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/item/{itemId}/enhanced")
    public ResponseEntity<UpdateEnhancementResponse> challengeEnhancedItem(
        @PathVariable("itemId") Long itemId,
        @RequestBody ItemEnhanceRequest enhanceDto
    ) {

        UpdateEnhancementResponse response = enhancedItemService.updateEnhanceItem(itemId, enhanceDto.toServiceDto());
        return ResponseEntity.ok(response);
    }
}
