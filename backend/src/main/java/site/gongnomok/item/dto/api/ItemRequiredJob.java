package site.gongnomok.item.dto.api;


import lombok.*;
import site.gongnomok.item.dto.service.ItemRequiredJobServiceDto;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Builder
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
