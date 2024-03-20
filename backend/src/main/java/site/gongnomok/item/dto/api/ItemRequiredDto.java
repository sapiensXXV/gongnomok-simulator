package site.gongnomok.item.dto.api;


import lombok.*;
import site.gongnomok.item.domain.Item;
import site.gongnomok.item.domain.RequiredStatus;
import site.gongnomok.item.dto.service.ItemRequiredServiceDto;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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

    public RequiredStatus toEntity() {
        return RequiredStatus.builder()
            .requiredLevel(level)
            .requiredStr(str)
            .requiredDex(dex)
            .requiredInt(intel)
            .requiredLuk(luk)
            .requiredPop(pop)
            .build();
    }

    public static ItemRequiredDto from(Item item) {
        return ItemRequiredDto.builder()
            .level(item.getRequiredStatus().getRequiredLevel())
            .str(item.getRequiredStatus().getRequiredStr())
            .dex(item.getRequiredStatus().getRequiredDex())
            .intel(item.getRequiredStatus().getRequiredInt())
            .luk(item.getRequiredStatus().getRequiredLuk())
            .pop(item.getRequiredStatus().getRequiredPop())
            .build();
    }
}
