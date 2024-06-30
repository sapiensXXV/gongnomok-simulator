package site.gongnomok.common.item.dto.request.itemlist;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@ToString
public class ItemListRequest {

    private String name;
    private String category;
    private JobSearchDto jobs;
    private int minLevel;

    public ItemListServiceRequest toServiceDto() {
        return ItemListServiceRequest.builder()
            .category(category)
            .jobs(jobs)
            .minLevel(minLevel)
            .name(name)
            .build();
    }

}
