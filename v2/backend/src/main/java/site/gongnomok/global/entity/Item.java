package site.gongnomok.global.entity;

import jakarta.persistence.*;
import lombok.*;
import site.gongnomok.global.entity.enumerate.Category;
import site.gongnomok.global.entity.enumerate.Job;

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

    @Enumerated(value = EnumType.STRING)
    private Job requiredJob;

    @Enumerated(value = EnumType.STRING)
    private Category category;

    private String str;
    private String dex;
    private String intel;
    private String luk;
    private String phyAtk;
    private String mgAtk;
    private String phyDef;
    private String mgDef;
    private String hp;
    private String mp;
    private int upgradable;
    private int viewCount;

}
