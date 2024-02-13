package site.gongnomok.domain.item.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter @Setter
@ToString
public class ItemStatusDto {

    private int str;
    private int dex;
    private int intel;
    private int luk;
    private int phyAtk;
    private int mgAtk;
    private int phyDef;
    private int mgDef;
    private int hp;
    private int mp;
}
