package site.gongnomok.data.item.domain;

import jakarta.persistence.*;
import lombok.*;
import site.gongnomok.common.item.dto.ItemDto;
import site.gongnomok.common.item.dto.domain.AvailableJobDto;
import site.gongnomok.common.item.dto.domain.RequiredStatusDto;
import site.gongnomok.common.item.dto.response.ItemStatusDto;

@Entity
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
@Builder
public class Item {

    @Id
    @Column(name = "item_id")
    private Long id;
    private String name;

    @Embedded
    private RequiredStatus requiredStatus;

    @Embedded
    private AvailableJob availableJob;

    @Embedded
    private ItemStatus status;

    @Enumerated(value = EnumType.STRING)
    private Category category;

    @Enumerated(value = EnumType.STRING)
    private AttackSpeed attackSpeed;

    private int upgradable;
    private int viewCount;
    private int knockBackPercent;

    public void addViewCount() {
        viewCount++;
    }

    public ItemDto toDto() {
        RequiredStatusDto requiredStatusDto = requiredStatus.toDto();
        AvailableJobDto availableJobDto = availableJob.toDto();
        ItemStatusDto itemStatusDto = status.toDto();

        return ItemDto.builder()
            .name(name)
            .requiredStatus(requiredStatusDto)
            .availableJob(availableJobDto)
            .category(category.name())
            .status(itemStatusDto)
            .viewCount(viewCount)
            .attackSpeed(attackSpeed.name())
            .upgradableCount(upgradable)
            .knockBackPercent(knockBackPercent)
            .build();
    }

    public static Item from(ItemDto dto, Long id) {
        return Item.builder()
            .id(id)
            .name(dto.getName())
            .requiredStatus(RequiredStatus.from(dto.getRequiredStatus()))
            .availableJob(AvailableJob.from(dto.getAvailableJob()))
            .status(ItemStatus.from(dto.getStatus()))
            .category(Category.from(dto.getCategory()))
            .attackSpeed(AttackSpeed.from(dto.getAttackSpeed()))
            .upgradable(dto.getUpgradableCount())
            .viewCount(dto.getViewCount())
            .knockBackPercent(dto.getKnockBackPercent())
            .build();
    }
}
