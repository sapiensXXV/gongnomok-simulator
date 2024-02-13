package site.gongnomok.domain.item.dto.api;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import site.gongnomok.domain.item.dto.service.ItemCreateServiceDto;
import site.gongnomok.global.entity.enumerate.Category;

@NoArgsConstructor
@Getter @Setter
@ToString
public class ItemCreateDto {

    private Long id;
    private String name;
    private ItemRequiredDto required;
    private String category;
    private ItemStatusDto status;
    private int upgradableCount;

    public ItemCreateServiceDto toServiceDto() {
        return ItemCreateServiceDto.builder()
                .id(id)
                .name(name)
                .required(required.toServiceDto())
                .category(Category.stringToCategory(category))
                .status(status.toServiceDto())
                .upgradableCount(upgradableCount)
                .build();
    }
}
