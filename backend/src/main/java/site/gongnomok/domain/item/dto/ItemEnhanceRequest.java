package site.gongnomok.domain.item.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.domain.item.dto.service.ItemEnhanceServiceRequest;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemEnhanceRequest {

    private Integer iev;
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
            .iev(iev)
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
