package site.gongnomok.common.item.dto.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class ItemStatusServiceDto {

    private ItemStatusInfoServiceDto str;
    private ItemStatusInfoServiceDto dex;
    private ItemStatusInfoServiceDto intel;
    private ItemStatusInfoServiceDto luk;
    private ItemStatusInfoServiceDto phyAtk;
    private ItemStatusInfoServiceDto mgAtk;
    private ItemStatusInfoServiceDto phyDef;
    private ItemStatusInfoServiceDto mgDef;
    private ItemStatusInfoServiceDto hp;
    private ItemStatusInfoServiceDto mp;
    private ItemStatusInfoServiceDto acc;
    private ItemStatusInfoServiceDto avo;
    private ItemStatusInfoServiceDto move;
    private ItemStatusInfoServiceDto jump;

    public static ItemStatusServiceDto makeAllZero() {
        ItemStatusInfoServiceDto zeroStatus = ItemStatusInfoServiceDto.getAllZero();
        return ItemStatusServiceDto.builder()
            .str(zeroStatus)
            .dex(zeroStatus)
            .intel(zeroStatus)
            .luk(zeroStatus)
            .phyAtk(zeroStatus)
            .mgAtk(zeroStatus)
            .phyDef(zeroStatus)
            .mgDef(zeroStatus)
            .hp(zeroStatus)
            .mp(zeroStatus)
            .acc(zeroStatus)
            .avo(zeroStatus)
            .move(zeroStatus)
            .jump(zeroStatus)
            .build();
    }

}
