package site.gongnomok.item.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.item.domain.Item;
import site.gongnomok.item.domain.ItemStatus;
import site.gongnomok.item.dto.request.ItemStatusRangeRequest;
import site.gongnomok.item.dto.request.ItemStatusRequest;


@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemStatusResponse {

    private ItemStatusRangeResponse str;
    private ItemStatusRangeResponse dex;
    private ItemStatusRangeResponse intel;
    private ItemStatusRangeResponse luk;
    private ItemStatusRangeResponse phyAtk;
    private ItemStatusRangeResponse mgAtk;
    private ItemStatusRangeResponse phyDef;
    private ItemStatusRangeResponse mgDef;
    private ItemStatusRangeResponse hp;
    private ItemStatusRangeResponse mp;
    private ItemStatusRangeResponse acc;
    private ItemStatusRangeResponse avo;
    private ItemStatusRangeResponse move;
    private ItemStatusRangeResponse jump;

    public static ItemStatusResponse from(Item item) {
        ItemStatus status = item.getStatus();

        return ItemStatusResponse.builder()
            .str(ItemStatusRangeResponse.from(status.getStr()))
            .dex(ItemStatusRangeResponse.from(status.getDex()))
            .intel(ItemStatusRangeResponse.from(status.getIntel()))
            .luk(ItemStatusRangeResponse.from(status.getLuk()))
            .phyAtk(ItemStatusRangeResponse.from(status.getPhyAtk()))
            .mgAtk(ItemStatusRangeResponse.from(status.getMgAtk()))
            .phyDef(ItemStatusRangeResponse.from(status.getPhyDef()))
            .mgDef(ItemStatusRangeResponse.from(status.getMgDef()))
            .hp(ItemStatusRangeResponse.from(status.getHp()))
            .mp(ItemStatusRangeResponse.from(status.getMp()))
            .acc(ItemStatusRangeResponse.from(status.getAcc()))
            .avo(ItemStatusRangeResponse.from(status.getAvo()))
            .move(ItemStatusRangeResponse.from(status.getMove()))
            .jump(ItemStatusRangeResponse.from(status.getJump()))
            .build();
    }

}
