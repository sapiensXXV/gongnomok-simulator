package site.gongnomok.enhanceditem.presentation;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.gongnomok.enhanceditem.dto.response.UpdateEnhancementResponse;
import site.gongnomok.enhanceditem.service.EnhancedItemService;
import site.gongnomok.enhanceditem.dto.request.ItemEnhanceRequest;
import site.gongnomok.enhanceditem.dto.response.ItemEnhanceResponse;

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
