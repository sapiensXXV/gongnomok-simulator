package site.gongnomok.domain.item.dto.api;


import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ItemListPageDto {
    private int pageNumber;
    private long offset;
    private int pageSize;
}
