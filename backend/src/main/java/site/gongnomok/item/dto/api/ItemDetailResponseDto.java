package site.gongnomok.item.dto.api;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.item.domain.Item;
import site.gongnomok.item.dto.request.ItemStatusRequest;
import site.gongnomok.item.dto.response.ItemStatusResponse;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class ItemDetailResponseDto {

    private String name;
    private ItemRequiredDto required;
    private ItemRequiredJob job;
    private String category;
    private ItemStatusResponse status;
    private int viewCount;
    private String attackSpeed;
    private int upgradableCount;
    private int knockBackPercent;

    public static ItemDetailResponseDto from(Item item) {

        ItemRequiredDto requiredDto = ItemRequiredDto.from(item);
        ItemRequiredJob job = ItemRequiredJob.from(item);

        return ItemDetailResponseDto.builder()
            .name(item.getName())
            .job(job)
            .required(requiredDto)
            .category(item.getCategory().name())
            .status(ItemStatusResponse.from(item))
            .viewCount(item.getViewCount())
            .attackSpeed(item.getAttackSpeed().name())
            .upgradableCount(item.getUpgradable())
            .knockBackPercent(item.getKnockBackPercent())
            .build();
    }

}
