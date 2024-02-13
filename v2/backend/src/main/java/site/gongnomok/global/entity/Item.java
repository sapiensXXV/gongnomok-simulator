package site.gongnomok.global.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.global.entity.enumerate.Category;
import site.gongnomok.global.entity.enumerate.Job;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
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

    private int str;
    private int dex;
    private int intel;
    private int luk;
    private int phyAtk;
    private int mgAtk;
    private int phyDef;
    private int mgDef;
    private int hp;
    private int mp;
    private int upgradable;

}
