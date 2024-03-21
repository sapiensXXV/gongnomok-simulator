package site.gongnomok.item.dto.request.itemlist;


import lombok.*;
import site.gongnomok.item.domain.Category;
import site.gongnomok.item.domain.Job;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@ToString
public class ItemListRequest {

    private String name;
    private String category;
    private String job;
    private int minLevel;

    public ItemListServiceRequest toServiceDto() {
        return ItemListServiceRequest.builder()
                .name(name)
                .category(category == null ? null : Category.stringToCategory(category))
                .job(job == null ? null : Job.stringToJob(job))
                .minLevel(minLevel)
                .build();
    }
}
