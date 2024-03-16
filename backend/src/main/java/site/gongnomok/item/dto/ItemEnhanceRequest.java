package site.gongnomok.item.dto;


import lombok.*;
import site.gongnomok.item.dto.service.ItemEnhanceServiceRequest;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ItemEnhanceRequest {

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

    public ItemEnhanceServiceRequest toServiceDto() {
        return ItemEnhanceServiceRequest.builder()
            .name(name)
            .iev(iev)
            .successCount(successCount)
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
