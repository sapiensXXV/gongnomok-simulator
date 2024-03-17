package site.gongnomok.item.dto.api;


import lombok.*;
import site.gongnomok.item.dto.service.ItemRequiredServiceDto;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Builder
@ToString
public class ItemRequiredDto {

    private int level;
    private int str;
    private int dex;
    private int intel;
    private int luk;
    private int pop;

    public ItemRequiredServiceDto toServiceDto() {
        return ItemRequiredServiceDto.builder()
                .level(level)
                .str(str)
                .dex(dex)
                .intel(intel)
                .luk(luk)
                .pop(pop)
                .build();

    }
}
