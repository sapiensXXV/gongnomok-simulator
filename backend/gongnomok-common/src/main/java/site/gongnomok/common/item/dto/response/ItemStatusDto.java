package site.gongnomok.common.item.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemStatusDto {

    private ItemStatusRangeDto str;
    private ItemStatusRangeDto dex;
    private ItemStatusRangeDto intel;
    private ItemStatusRangeDto luk;
    private ItemStatusRangeDto phyAtk;
    private ItemStatusRangeDto mgAtk;
    private ItemStatusRangeDto phyDef;
    private ItemStatusRangeDto mgDef;
    private ItemStatusRangeDto hp;
    private ItemStatusRangeDto mp;
    private ItemStatusRangeDto acc;
    private ItemStatusRangeDto avo;
    private ItemStatusRangeDto move;
    private ItemStatusRangeDto jump;

}
