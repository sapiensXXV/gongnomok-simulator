package site.gongnomok.common.item.dto.domain;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class RequiredStatusDto {

    private int level;
    private int str;
    private int dex;
    private int intel;
    private int luk;
    private int pop;

    public static RequiredStatusDto makeDefault() {
        return RequiredStatusDto.builder()
            .level(0)
            .str(0)
            .dex(0)
            .intel(0)
            .luk(0)
            .pop(0)
            .build();
    }
}
