package site.gongnomok.item.dto.api;

import lombok.*;
import site.gongnomok.item.dto.request.ItemStatusRequest;

@NoArgsConstructor
@Getter @Setter
@ToString
public class ItemCreateDto {

    private Long id;
    private String name;
    private ItemRequiredJob requiredJob;
    private ItemRequiredDto required;
    private String category;
    private ItemStatusRequest status;
    private int upgradableCount;
    private String attackSpeed;
    private int knockBackPercent;

//    public ItemCreateServiceDto toServiceDto() {
//        return ItemCreateServiceDto.builder()
//                .id(id)
//                .name(name)
//                .requiredJob(requiredJob.toServiceDto())
//                .required(required.toServiceDto())
//                .category(category == null ? null : Category.stringToCategory(category))
//                .status(status.toServiceDto())
//                .upgradableCount(upgradableCount)
//                .attackSpeed(attackSpeed == null ? null : AttackSpeed.stringToAttackSpeed(attackSpeed))
//                .knockBackPercent(knockBackPercent)
//                .build();
//    }
}
