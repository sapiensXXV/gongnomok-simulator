package site.gongnomok.domain.item.dto.api;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import site.gongnomok.domain.item.dto.service.ItemRequiredJobServiceDto;
import site.gongnomok.domain.item.dto.service.ItemRequiredServiceDto;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class ItemRequiredJob {
    private boolean common;
    private boolean warrior;
    private boolean bowman;
    private boolean magician;
    private boolean thief;

    public ItemRequiredJobServiceDto toServiceDto() {
        return ItemRequiredJobServiceDto.builder()
                .common(common)
                .warrior(warrior)
                .bowman(bowman)
                .magician(magician)
                .thief(thief)
                .build();
    }
}
