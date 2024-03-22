package site.gongnomok.enhanceditem.domain;


import jakarta.persistence.Embeddable;
import lombok.Getter;
import site.gongnomok.enhanceditem.dto.ItemEnhanceRequest;

@Embeddable
@Getter
public class EnhancedStatus {
    private int str;
    private int dex;
    private int intel;
    private int luk;
    private int phyAtk;
    private int mgAtk;
    private int phyDef;
    private int mgDef;
    private int acc;
    private int avo;
    private int move;
    private int jump;
    private int hp;
    private int mp;

    public void changeStatus(ItemEnhanceRequest dto) {
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
}
