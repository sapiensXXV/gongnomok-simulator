package site.gongnomok.global.entity;

import jakarta.persistence.*;
import lombok.*;
import site.gongnomok.global.entity.enumerate.AttackSpeed;
import site.gongnomok.global.entity.enumerate.Category;

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

    private String str;
    private String dex;
    private String intel;
    private String luk;
    private String phyAtk;
    private String mgAtk;
    private String phyDef;
    private String mgDef;
    private String acc; //명중률
    private String avo; //회피율
    private String move; //이동속도
    private String jump; //점프력
    private String hp;
    private String mp;
    private int upgradable;
    private int viewCount;

}
