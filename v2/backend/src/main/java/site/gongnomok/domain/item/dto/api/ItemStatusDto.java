package site.gongnomok.domain.item.dto.api;


import lombok.*;
import site.gongnomok.domain.item.dto.service.ItemStatusInfoServiceDto;
import site.gongnomok.domain.item.dto.service.ItemStatusServiceDto;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@ToString
@Builder
public class ItemStatusDto {

    private ItemStatusInfoDto str;
    private ItemStatusInfoDto dex;
    private ItemStatusInfoDto intel;
    private ItemStatusInfoDto luk;
    private ItemStatusInfoDto phyAtk;
    private ItemStatusInfoDto mgAtk;
    private ItemStatusInfoDto phyDef;
    private ItemStatusInfoDto mgDef;
    private ItemStatusInfoDto hp;
    private ItemStatusInfoDto mp;

    public ItemStatusServiceDto toServiceDto() {
        return ItemStatusServiceDto.builder()
                .str(str.toServiceDto())
                .dex(dex.toServiceDto())
                .intel(intel.toServiceDto())
                .luk(luk.toServiceDto())
                .phyAtk(phyAtk.toServiceDto())
                .mgAtk(mgAtk.toServiceDto())
                .phyDef(phyDef.toServiceDto())
                .mgDef(mgDef.toServiceDto())
                .hp(hp.toServiceDto())
                .mp(mp.toServiceDto())
                .build();
    }
}
