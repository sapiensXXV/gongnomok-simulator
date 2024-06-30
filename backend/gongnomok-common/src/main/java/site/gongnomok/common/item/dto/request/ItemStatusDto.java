package site.gongnomok.common.item.dto.request;

import lombok.*;
import site.gongnomok.common.item.dto.ItemDto;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@ToString
@Builder
public class ItemStatusDto {

    private ItemStatusRangeRequest str;
    private ItemStatusRangeRequest dex;
    private ItemStatusRangeRequest intel;
    private ItemStatusRangeRequest luk;
    private ItemStatusRangeRequest phyAtk;
    private ItemStatusRangeRequest mgAtk;
    private ItemStatusRangeRequest phyDef;
    private ItemStatusRangeRequest mgDef;
    private ItemStatusRangeRequest hp;
    private ItemStatusRangeRequest mp;
    private ItemStatusRangeRequest acc;
    private ItemStatusRangeRequest avo;
    private ItemStatusRangeRequest move;
    private ItemStatusRangeRequest jump;

    public static ItemStatusDto from(ItemDto item) {
        site.gongnomok.common.item.dto.response.ItemStatusDto status = item.getStatus();

        return ItemStatusDto.builder()
            .str(ItemStatusRangeRequest.from(status.getStr()))
            .dex(ItemStatusRangeRequest.from(status.getDex()))
            .intel(ItemStatusRangeRequest.from(status.getIntel()))
            .luk(ItemStatusRangeRequest.from(status.getLuk()))
            .phyAtk(ItemStatusRangeRequest.from(status.getPhyAtk()))
            .mgAtk(ItemStatusRangeRequest.from(status.getMgAtk()))
            .phyDef(ItemStatusRangeRequest.from(status.getPhyDef()))
            .mgDef(ItemStatusRangeRequest.from(status.getMgDef()))
            .hp(ItemStatusRangeRequest.from(status.getHp()))
            .mp(ItemStatusRangeRequest.from(status.getMp()))
            .acc(ItemStatusRangeRequest.from(status.getAcc()))
            .avo(ItemStatusRangeRequest.from(status.getAvo()))
            .move(ItemStatusRangeRequest.from(status.getMove()))
            .jump(ItemStatusRangeRequest.from(status.getJump()))
            .build();
    }

}
