package site.gongnomok.domain.item.dto.api.itemlist;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.global.entity.enumerate.Category;
import site.gongnomok.global.entity.enumerate.Job;


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
