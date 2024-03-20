package site.gongnomok.item.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
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
}
