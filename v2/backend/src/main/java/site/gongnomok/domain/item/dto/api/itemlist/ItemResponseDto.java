package site.gongnomok.domain.item.dto.api.itemlist;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class ItemResponseDto {

    private Long itemId;
    private String name;
}
