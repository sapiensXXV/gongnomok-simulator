package site.gongnomok.common.item.dto.request.itemlist;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class ItemListServiceRequest {

    private String category;
    private JobSearchDto jobs;
    private int minLevel;
    private String name;
}
