package site.gongnomok.domain.item.dto.api;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import site.gongnomok.domain.item.dto.service.ItemStatusInfoServiceDto;
import site.gongnomok.domain.item.dto.service.ItemStatusServiceDto;

@NoArgsConstructor
@Getter @Setter
@ToString
public class ItemStatusInfoDto {
    private int normal;
    private int lower;
    private int upper;

    public ItemStatusInfoServiceDto toServiceDto() {
        return ItemStatusInfoServiceDto.builder()
                .normal(normal)
                .lower(lower)
                .upper(upper)
                .build();
    }
}
