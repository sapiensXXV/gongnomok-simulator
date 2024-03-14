package site.gongnomok.domain.item.dto.service;

import lombok.*;
import site.gongnomok.global.entity.enumerate.AttackSpeed;
import site.gongnomok.global.entity.enumerate.Category;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class ItemCreateServiceDto {

    private Long id;
    private String name;
    private ItemRequiredJobServiceDto requiredJob;
    private ItemRequiredServiceDto required;
    private Category category;
    private ItemStatusServiceDto status;
    private int upgradableCount;
    private AttackSpeed attackSpeed;
    private int knockBackPercent;

}
