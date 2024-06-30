package site.gongnomok.common.item.dto.request;

import lombok.*;
import site.gongnomok.common.item.dto.response.ItemStatusRangeDto;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@ToString
@Builder
public class ItemStatusRangeRequest {
    private int normal;
    private int lower;
    private int upper;

    public static ItemStatusRangeRequest from(final ItemStatusRangeDto range) {
        return new ItemStatusRangeRequest(range.getLower(), range.getNormal(), range.getUpper());
    }

    public static ItemStatusRangeRequest makeDefaultRequest() {
        return ItemStatusRangeRequest.builder()
            .lower(0)
            .normal(0)
            .upper(0)
            .build();
    }

}
