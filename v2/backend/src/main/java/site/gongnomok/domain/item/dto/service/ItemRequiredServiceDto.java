package site.gongnomok.domain.item.dto.service;


import lombok.*;
import site.gongnomok.global.entity.enumerate.Job;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ItemRequiredServiceDto {
    private int level;
    private int str;
    private int dex;
    private int intel;
    private int luk;
    private int pop;
    private Job job;
}
