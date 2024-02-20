package site.gongnomok.domain.item.dto.api;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import site.gongnomok.domain.item.dto.service.ItemCreateServiceDto;
import site.gongnomok.global.entity.enumerate.AttackSpeed;
import site.gongnomok.global.entity.enumerate.Category;

@NoArgsConstructor
@Getter @Setter
@ToString
public class ItemCreateDto {

    private Long id;
    private String name;
    private ItemRequiredJob requiredJob;
    private ItemRequiredDto required;
    private String category;
    private ItemStatusDto status;
    private int upgradableCount;
    private String attackSpeed;
    private int knockBackPercent;

    public ItemCreateServiceDto toServiceDto() {
        return ItemCreateServiceDto.builder()
                .id(id)
                .name(name)
                .requiredJob(requiredJob.toServiceDto())
                .required(required.toServiceDto())
                .category(category == null ? null : Category.stringToCategory(category))
                .status(status.toServiceDto())
                .upgradableCount(upgradableCount)
                .attackSpeed(attackSpeed == null ? null : AttackSpeed.stringToAttackSpeed(attackSpeed))
                .knockBackPercent(knockBackPercent)
                .build();
    }
}
