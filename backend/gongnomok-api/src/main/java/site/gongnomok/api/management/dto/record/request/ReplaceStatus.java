package site.gongnomok.api.management.dto.record.request;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReplaceStatus {
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
}
