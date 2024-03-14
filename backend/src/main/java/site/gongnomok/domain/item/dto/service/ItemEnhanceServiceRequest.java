package site.gongnomok.domain.item.dto.service;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.global.entity.EnhancedItem;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemEnhanceServiceRequest {

    private String name;
    private Integer iev;
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

    public static EnhancedItem createEntity(final ItemEnhanceServiceRequest dto) {
        return EnhancedItem.builder()
            .name(dto.getName())
            .iev(dto.getIev())
            .successCount(dto.getSuccessCount())
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

}
