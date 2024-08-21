package site.gongnomok.common.management.dto.record.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import site.gongnomok.core.management.log.dto.RecordReplaceServiceStatus;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
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

    public RecordReplaceServiceStatus toServiceDto() {
        return new RecordReplaceServiceStatus(
            str,
            dex,
            intel,
            luk,
            phyAtk,
            mgAtk,
            phyDef,
            mgDef,
            acc,
            avo,
            move,
            jump,
            hp,
            mp
        );
    }
}
