package site.gongnomok.common.item.dto.request;

import lombok.*;
import site.gongnomok.common.item.dto.ItemDto;
import site.gongnomok.common.item.dto.domain.AvailableJobDto;
import site.gongnomok.common.item.dto.domain.RequiredStatusDto;
import site.gongnomok.common.item.dto.response.ItemStatusDto;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@ToString
@Builder
public class ItemCreateRequest {

    private Long id;
    private String name;
    private AvailableJobDto availableJob;
    private RequiredStatusDto required;
    private String category;
    private ItemStatusDto status;
    private int upgradableCount;
    private String attackSpeed;
    private int knockBackPercent;

    public ItemDto toEntityDto() {
        return ItemDto.builder()
            .name(name)
            .availableJob(availableJob)
            .requiredStatus(required)
            .status(status)
            .category(category)
            .upgradableCount(upgradableCount)
            .attackSpeed(attackSpeed)
            .knockBackPercent(knockBackPercent)
            .build();

    }

}
