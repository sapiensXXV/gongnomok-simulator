package site.gongnomok.common.item.dto.api.itemlist;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class ItemResponse {

    private Long itemId;
    private String name;
}
