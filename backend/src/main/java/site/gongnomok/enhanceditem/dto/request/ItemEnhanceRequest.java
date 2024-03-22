package site.gongnomok.enhanceditem.dto.request;


import lombok.*;
import site.gongnomok.enhanceditem.domain.EnhanceScroll;
import site.gongnomok.enhanceditem.domain.EnhancedItem;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ItemEnhanceRequest {

    private String name;
    private int upgradable;
    private int score;
    private String scroll;
    private EnhanceSuccessDto success;
    private EnhanceStatusDto status;

    public EnhancedItem toEntity() {
        return EnhancedItem.builder()
            .name(name)
            .scroll(EnhanceScroll.from(scroll))
            .success(success.toEntity())
            .status(status.toEntity())
            .build();
    }
}
