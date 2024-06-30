package site.gongnomok.common.item.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.common.item.dto.domain.AvailableJobDto;
import site.gongnomok.common.item.dto.domain.RequiredStatusDto;
import site.gongnomok.common.item.dto.response.ItemStatusDto;

/**
 * Item Entity의 정보를 그대로 담고 있는 클래스이다.
 * common-dto 계층과 data 계층을 분리하기 위해서 만들어졌다.
 * @author Jaehoon So
 * @version 1.0.0
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class ItemDto {

    private String name;
    private RequiredStatusDto requiredStatus;
    private AvailableJobDto availableJob;
    private String category;
    private ItemStatusDto status;
    private int viewCount;
    private String attackSpeed;
    private int upgradableCount;
    private int knockBackPercent;

}
