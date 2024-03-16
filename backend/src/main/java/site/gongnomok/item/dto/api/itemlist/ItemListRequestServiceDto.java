package site.gongnomok.item.dto.api.itemlist;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.item.domain.Category;
import site.gongnomok.item.domain.Job;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class ItemListRequestServiceDto {

    private Category category;
    private Job job;
    private int minLevel;
    private String name;

}
