package site.gongnomok.item.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.item.domain.ItemStatusRange;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemStatusRangeResponse {

    private int normal;
    private int lower;
    private int upper;

    public static ItemStatusRangeResponse from(ItemStatusRange range) {
        return ItemStatusRangeResponse.builder()
            .lower(range.getLower())
            .normal(range.getNormal())
            .upper(range.getUpper())
            .build();
    }

}
