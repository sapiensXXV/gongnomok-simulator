package site.gongnomok.domain.item.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter @Setter
@ToString
public class ItemRequiredDto {

    private int level;
    private int str;
    private int dex;
    private int intel;
    private int luk;
    private int pop;
    private String job;

}
