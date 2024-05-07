package site.gongnomok.item.dto.request.itemlist;


import lombok.*;
import site.gongnomok.item.domain.Category;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@ToString
public class ItemListRequest {

//    private String name;
//    private String category;
//    private String job;
//    private int minLevel;
//
//    public ItemListServiceRequest toServiceDto() {
//        return ItemListServiceRequest.builder()
//                .name(name)
//                .category(category == null ? null : Category.stringToCategory(category))
//                .job(job == null ? null : Job.stringToJob(job))
//                .minLevel(minLevel)
//                .build();
//    }

    private String name;
    private String category;
    private JobSearchDto jobs;
    private int minLevel;

    public ItemListServiceRequest toServiceDto() {
        return ItemListServiceRequest.builder()
            .category(Category.parseFrom(category))
            .jobs(jobs)
            .minLevel(minLevel)
            .name(name)
            .build();
    }

}
