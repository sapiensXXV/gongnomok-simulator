package site.gongnomok.item.dto;


import lombok.*;
import site.gongnomok.enhanceditem.domain.EnhanceScroll;
import site.gongnomok.enhanceditem.domain.EnhancedItem;
import site.gongnomok.enhanceditem.domain.EnhancedStatus;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ItemEnhanceRequest {

    private String name;
    private String category;
    private int iev;
    private int successCount;
    private int tenSuccessCount;
    private int sixtySuccessCount;
    private int hundredSuccessCount;
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

    public EnhancedItem toEntity() {
        return EnhancedItem.builder()
            .name(getName())
            .iev(getIev())
            .successCount(successCount)
            .tenSuccessCount(tenSuccessCount)
            .sixtySuccessCount(sixtySuccessCount)
            .hundredSuccessCount(hundredSuccessCount)
            .status(EnhancedStatus.)
            .scroll(EnhanceScroll.from(category))


    }
}
