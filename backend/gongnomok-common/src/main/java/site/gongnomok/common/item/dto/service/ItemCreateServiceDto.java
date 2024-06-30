package site.gongnomok.common.item.dto.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class ItemCreateServiceDto {

    private Long id;
    private String name;
    private ItemRequiredJobServiceDto requiredJob;
    private RequiredStatusServiceDto required;
    private String category;
    private ItemStatusServiceDto status;
    private int upgradableCount;
    private String attackSpeed;
    private int knockBackPercent;

}
