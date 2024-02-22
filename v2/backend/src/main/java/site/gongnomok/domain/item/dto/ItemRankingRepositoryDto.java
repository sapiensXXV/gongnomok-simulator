package site.gongnomok.domain.item.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ItemRankingRepositoryDto {

    private Long itemId;
    private String name;
    private int viewCount;

}
