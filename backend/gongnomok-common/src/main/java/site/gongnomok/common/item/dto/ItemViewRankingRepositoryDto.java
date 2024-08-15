package site.gongnomok.common.item.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ItemViewRankingRepositoryDto {

    private Long itemId;
    private String name;
    private int viewCount;

}
