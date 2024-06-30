package site.gongnomok.common.item.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemStatusRangeDto {

    private int normal;
    private int lower;
    private int upper;

}
