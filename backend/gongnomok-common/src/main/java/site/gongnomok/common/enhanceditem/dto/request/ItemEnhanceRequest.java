package site.gongnomok.common.enhanceditem.dto.request;


import lombok.*;

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
        return ItemEnhanceServiceRequest.builder()
            .name(name)
            .upgradable(upgradable)
            .iev(iev)
            .scroll(scroll)
            .success(success)
            .status(status)
            .build();
    }
}
