package site.gongnomok.enhanceditem.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.enhanceditem.domain.EnhanceStatus;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnhanceStatusDto {
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

    public EnhanceStatus toEntity() {
        return EnhanceStatus.builder()
            .str(str)
            .dex(dex)
            .intel(intel)
            .luk(luk)
            .phyAtk(phyAtk)
            .mgAtk(mgAtk)
            .phyDef(phyDef)
            .mgDef(mgDef)
            .acc(acc)
            .avo(avo)
            .move(move)
            .jump(jump)
            .hp(hp)
            .mp(mp)
            .build();
    }
}
