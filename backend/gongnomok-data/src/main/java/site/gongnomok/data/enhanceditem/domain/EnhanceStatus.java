package site.gongnomok.data.enhanceditem.domain;


import jakarta.persistence.Embeddable;
import lombok.*;
import site.gongnomok.common.enhanceditem.dto.request.EnhanceStatusDto;
import site.gongnomok.data.management.record.domain.EnhanceRecordStatus;

@Embeddable
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EnhanceStatus {
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

    public EnhanceStatusDto toDto() {
        return EnhanceStatusDto.builder()
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

    public static EnhanceStatus from(EnhanceStatusDto dto) {
        return EnhanceStatus.builder()
            .str(dto.getStr())
            .dex(dto.getDex())
            .intel(dto.getIntel())
            .luk(dto.getLuk())
            .phyAtk(dto.getPhyAtk())
            .mgAtk(dto.getMgAtk())
            .phyDef(dto.getPhyDef())
            .mgDef(dto.getMgDef())
            .acc(dto.getAcc())
            .avo(dto.getAvo())
            .move(dto.getMove())
            .jump(dto.getJump())
            .hp(dto.getHp())
            .mp(dto.getMp())
            .build();
    }
    
    public static EnhanceStatus from(EnhanceRecordStatus record) {
        return EnhanceStatus.builder()
            .str(record.getStr())
            .dex(record.getDex())
            .intel(record.getIntel())
            .luk(record.getLuk())
            .phyAtk(record.getPhyAtk())
            .mgAtk(record.getMgAtk())
            .phyDef(record.getPhyDef())
            .mgDef(record.getMgDef())
            .acc(record.getAcc())
            .avo(record.getAvo())
            .move(record.getMove())
            .jump(record.getJump())
            .hp(record.getHp())
            .mp(record.getMp())
            .build();
    }
}
