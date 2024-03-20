package site.gongnomok.item.dto.request;


import lombok.*;
import site.gongnomok.item.domain.ItemStatusRange;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@ToString
@Builder
public class ItemStatusRangeRequest {
    private int normal;
    private int lower;
    private int upper;

//    public ItemStatusInfoServiceDto toServiceDto() {
//        return ItemStatusInfoServiceDto.builder()
//                .normal(normal)
//                .lower(lower)
//                .upper(upper)
//                .build();
//    }

    public static ItemStatusRangeRequest from(final ItemStatusRange range) {
        return new ItemStatusRangeRequest(range.getLower(), range.getNormal(), range.getUpper());
    }

    public ItemStatusRange toEntity() {
        return ItemStatusRange.builder()
            .lower(lower)
            .normal(normal)
            .upper(upper)
            .build();
    }

    public static ItemStatusRangeRequest makeDefaultRequest() {
        return ItemStatusRangeRequest.builder()
            .lower(0)
            .normal(0)
            .upper(0)
            .build();
    }

}
