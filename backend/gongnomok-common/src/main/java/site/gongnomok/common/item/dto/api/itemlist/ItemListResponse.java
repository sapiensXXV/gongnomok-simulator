package site.gongnomok.common.item.dto.api.itemlist;

import lombok.Getter;
import lombok.ToString;

import java.io.Serializable;
import java.util.List;

@Getter
@ToString
public class ItemListResponse implements Serializable {

    private List<ItemResponse> items;

    private ItemListResponse() {
    }

    private ItemListResponse(
            final List<ItemResponse> items
    ) {
        this.items = items;
    }

    public static ItemListResponse of(
            List<ItemResponse> items
    ) {
        return new ItemListResponse(items);
    }
}
