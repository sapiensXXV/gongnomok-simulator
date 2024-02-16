package site.gongnomok.domain.item.dto.api;


import lombok.*;
import site.gongnomok.domain.item.dto.service.ItemRequiredServiceDto;
import site.gongnomok.global.entity.enumerate.Job;

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
