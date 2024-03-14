package site.gongnomok.global.entity;


import jakarta.persistence.*;
import lombok.*;
import site.gongnomok.domain.item.dto.service.ItemEnhanceServiceRequest;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class EnhancedItem {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enhanced_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "item_id")
    private Item item;

    private String name;
    private Integer iev; // item enhancement value
    private Integer successCount;
    private Integer str;
    private Integer dex;
    private Integer intel;
    private Integer luk;
    private Integer phyAtk;
    private Integer mgAtk;
    private Integer phyDef;
    private Integer mgDef;
    private Integer acc;
    private Integer avo;
    private Integer move;
    private Integer jump;
    private Integer hp;
    private Integer mp;

    public void changeStatus(ItemEnhanceServiceRequest dto) {
        name = dto.getName();
        iev = dto.getIev();
        successCount = dto.getSuccessCount();
        str = dto.getStr();
        dex = dto.getDex();
        intel = dto.getIntel();
        luk = dto.getLuk();
        phyAtk = dto.getPhyAtk();
        mgAtk = dto.getMgAtk();
        phyDef = dto.getPhyDef();
        mgDef = dto.getMgDef();
        acc = dto.getAcc();
        avo = dto.getAvo();
        move = dto.getMove();
        jump = dto.getJump();
        hp = dto.getHp();
        mp = dto.getMp();
    }

    public void changeItem(Item item) {
        this.item = item;
    }
}
