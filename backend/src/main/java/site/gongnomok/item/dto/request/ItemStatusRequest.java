package site.gongnomok.item.dto.request;


import lombok.*;
import site.gongnomok.item.domain.Item;
import site.gongnomok.item.domain.ItemStatus;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@ToString
@Builder
public class ItemStatusRequest {

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

    public static ItemStatusRequest from(Item item) {
        ItemStatus status = item.getStatus();

        return ItemStatusRequest.builder()
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

    public ItemStatus toEntity() {
        return ItemStatus.builder()
            .str(str.toEntity())
            .dex(dex.toEntity())
            .intel(intel.toEntity())
            .luk(luk.toEntity())
            .phyAtk(phyAtk.toEntity())
            .mgAtk(mgAtk.toEntity())
            .phyDef(phyDef.toEntity())
            .mgDef(mgDef.toEntity())
            .hp(hp.toEntity())
            .mp(mp.toEntity())
            .acc(acc.toEntity())
            .avo(avo.toEntity())
            .move(move.toEntity())
            .jump(jump.toEntity())
            .build();
    }

    public static ItemStatusRequest makeDefaultRequest() {
        return ItemStatusRequest.builder()
            .str(ItemStatusRangeRequest.makeDefaultRequest())
            .dex(ItemStatusRangeRequest.makeDefaultRequest())
            .intel(ItemStatusRangeRequest.makeDefaultRequest())
            .luk(ItemStatusRangeRequest.makeDefaultRequest())
            .phyAtk(ItemStatusRangeRequest.makeDefaultRequest())
            .mgAtk(ItemStatusRangeRequest.makeDefaultRequest())
            .phyDef(ItemStatusRangeRequest.makeDefaultRequest())
            .mgDef(ItemStatusRangeRequest.makeDefaultRequest())
            .hp(ItemStatusRangeRequest.makeDefaultRequest())
            .mp(ItemStatusRangeRequest.makeDefaultRequest())
            .acc(ItemStatusRangeRequest.makeDefaultRequest())
            .avo(ItemStatusRangeRequest.makeDefaultRequest())
            .move(ItemStatusRangeRequest.makeDefaultRequest())
            .jump(ItemStatusRangeRequest.makeDefaultRequest())
            .build();
    }
}
