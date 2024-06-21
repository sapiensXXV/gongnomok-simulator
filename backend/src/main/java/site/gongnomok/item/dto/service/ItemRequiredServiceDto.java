package site.gongnomok.item.dto.service;


import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Builder
public class ItemRequiredServiceDto {
    private int level;
    private int str;
    private int dex;
    private int intel;
    private int luk;
    private int pop;

    public static ItemRequiredServiceDto getAllZeroDto() {
        return ItemRequiredServiceDto.builder()
            .level(0)
            .str(0)
            .dex(0)
            .intel(0)
            .luk(0)
            .build();
    }

}
