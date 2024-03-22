package site.gongnomok.enhanceditem.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.enhanceditem.domain.EnhanceStatus;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnhanceStatusResponseDto {
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

    public static EnhanceStatusResponseDto getBasic() {
        return EnhanceStatusResponseDto.builder()
            .str(0)
            .dex(0)
            .intel(0)
            .luk(0)
            .phyAtk(0)
            .mgAtk(0)
            .phyDef(0)
            .mgDef(0)
            .acc(0)
            .avo(0)
            .move(0)
            .jump(0)
            .hp(0)
            .mp(0)
            .build();
    }

    public static EnhanceStatusResponseDto from(EnhanceStatus status) {
        return EnhanceStatusResponseDto.builder()
            .str(status.getStr())
            .dex(status.getDex())
            .intel(status.getIntel())
            .luk(status.getLuk())
            .phyAtk(status.getPhyAtk())
            .mgAtk(status.getMgAtk())
            .phyDef(status.getPhyDef())
            .mgDef(status.getMgDef())
            .acc(status.getAcc())
            .avo(status.getAvo())
            .move(status.getMove())
            .jump(status.getJump())
            .hp(status.getHp())
            .mp(status.getMp())
            .build();
    }
}
