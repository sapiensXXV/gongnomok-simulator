package site.gongnomok.item.dto.request.itemlist;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.item.domain.Category;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class ItemListServiceRequest {

    private Category category;
    private JobSearchDto jobs;
    private int minLevel;
    private String name;
}
