package site.gongnomok.domain.item.dto.api.itemlist;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class ItemListResponseDto {

    private List<ItemResponseDto> items;
    private int startPage;
    private int endPage;

    private ItemListResponseDto() {
    }

    private ItemListResponseDto(
            final List<ItemResponseDto> items,
            final int startPage,
            final int endPage
    ) {
        this.items = items;
        this.startPage = startPage;
        this.endPage = endPage;
    }

    public static ItemListResponseDto of(
            List<ItemResponseDto> items,
            final int startPage,
            final int endPage
    ) {
        return new ItemListResponseDto(items, startPage, endPage);
    }
}
