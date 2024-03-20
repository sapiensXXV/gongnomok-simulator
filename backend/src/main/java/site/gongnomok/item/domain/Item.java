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
    private int requiredLevel;
    private int requiredStr;
    private int requiredDex;
    private int requiredInt;
    private int requiredLuk;
    private int requiredPop;

    private boolean common;
    private boolean warrior;
    private boolean bowman;
    private boolean magician;
    private boolean thief;

    @Enumerated(value = EnumType.STRING)
    private Category category;

    @Enumerated(value = EnumType.STRING)
    private AttackSpeed attackSpeed;

    private ItemStatus status;

    private int upgradable;
    private int viewCount;
    private int knockBackPercent;

    public void addViewCount() {
        viewCount++;
    }

}
