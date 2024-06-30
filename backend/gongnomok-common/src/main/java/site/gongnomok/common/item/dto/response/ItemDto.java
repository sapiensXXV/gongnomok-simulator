package site.gongnomok.common.item.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.common.item.dto.domain.RequiredStatusDto;
import site.gongnomok.common.item.dto.domain.AvailableJobDto;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class ItemDto {

    private String name;
    private RequiredStatusDto required;
    private AvailableJobDto job;
    private String category;
    private ItemStatusDto status;
    private int viewCount;
    private String attackSpeed;
    private int upgradableCount;
    private int knockBackPercent;

}
