package site.gongnomok.domain.item.dto.api;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class ItemDetailResponseDto {

    private String name;
    private ItemRequiredDto required;
    private ItemRequiredJob job;
    private String category;
    private ItemStatusDto status;
    private int viewCount;

    private String attackSpeed;
    private int upgradableCount;

}
