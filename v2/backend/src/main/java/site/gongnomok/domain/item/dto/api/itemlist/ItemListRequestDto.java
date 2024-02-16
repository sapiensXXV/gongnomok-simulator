package site.gongnomok.domain.item.dto.api.itemlist;


import lombok.*;
import site.gongnomok.global.entity.enumerate.Category;
import site.gongnomok.global.entity.enumerate.Job;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@ToString
public class ItemListRequestDto {

    private String name;
    private String category;
    private String job;
    private int minLevel;

    public ItemListRequestServiceDto toServiceDto() {
        return ItemListRequestServiceDto.builder()
                .name(name)
                .category(category == null ? null : Category.stringToCategory(category))
                .job(Job.stringToJob(job))
                .minLevel(minLevel)
                .build();
    }
}
