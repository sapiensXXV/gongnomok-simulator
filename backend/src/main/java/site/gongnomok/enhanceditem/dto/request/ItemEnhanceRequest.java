package site.gongnomok.enhanceditem.dto.request;


import lombok.*;
import site.gongnomok.enhanceditem.domain.EnhanceScroll;
import site.gongnomok.enhanceditem.domain.EnhanceStatus;
import site.gongnomok.enhanceditem.domain.EnhanceSuccess;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ItemEnhanceRequest {

    private String name;
    private int upgradable;
    private int iev;
    private String scroll;
    private EnhanceSuccessDto success;
    private EnhanceStatusDto status;

    public ItemEnhanceServiceRequest toServiceDto() {

        EnhanceScroll appliedScroll = EnhanceScroll.from(scroll);
        EnhanceSuccess successEntity = success.toEntity();
        EnhanceStatus statusEntity = status.toEntity();

        return ItemEnhanceServiceRequest.builder()
            .name(name)
            .upgradable(upgradable)
            .iev(iev)
            .score(appliedScroll.calculateScore(successEntity))
            .scroll(appliedScroll)
            .success(successEntity)
            .status(statusEntity)
            .build();
    }
}
