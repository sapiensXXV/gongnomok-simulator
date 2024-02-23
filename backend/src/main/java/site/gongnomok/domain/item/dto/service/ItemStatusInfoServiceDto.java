package site.gongnomok.domain.item.dto.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class ItemStatusInfoServiceDto {

    private int normal;
    private int lower;
    private int upper;

}
