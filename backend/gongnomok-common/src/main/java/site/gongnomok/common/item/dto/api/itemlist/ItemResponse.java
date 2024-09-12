package site.gongnomok.common.item.dto.api.itemlist;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class ItemResponse implements Serializable {

    private Long itemId;
    private String name;
}
