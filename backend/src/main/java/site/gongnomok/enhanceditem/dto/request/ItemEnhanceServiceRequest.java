package site.gongnomok.enhanceditem.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.enhanceditem.domain.EnhanceScroll;
import site.gongnomok.enhanceditem.domain.EnhanceStatus;
import site.gongnomok.enhanceditem.domain.EnhanceSuccess;
import site.gongnomok.enhanceditem.domain.EnhancedItem;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemEnhanceServiceRequest {

    private String name;
    private int upgradable;
    private int iev;
    private int score;
    private EnhanceScroll scroll;
    private EnhanceSuccess success;
    private EnhanceStatus status;

    public EnhancedItem toEntity() {
        return EnhancedItem.builder()
            .name(name)
            .iev(iev)
            .score(score)
            .scroll(scroll)
            .success(success)
            .status(status)
            .build();
    }

}
