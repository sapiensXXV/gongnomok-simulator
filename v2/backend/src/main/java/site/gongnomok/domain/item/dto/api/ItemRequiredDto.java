package site.gongnomok.domain.item.dto.api;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import site.gongnomok.domain.item.dto.service.ItemRequiredServiceDto;
import site.gongnomok.global.entity.enumerate.Job;

@NoArgsConstructor
@Getter @Setter
@ToString
public class ItemRequiredDto {

    private int level;
    private int str;
    private int dex;
    private int intel;
    private int luk;
    private int pop;
    private String job;

    public ItemRequiredServiceDto toServiceDto() {
        return ItemRequiredServiceDto.builder()
                .level(level)
                .str(str)
                .dex(dex)
                .intel(intel)
                .luk(luk)
                .pop(pop)
                .job(Job.stringToJob(job))
                .build();

    }
}
