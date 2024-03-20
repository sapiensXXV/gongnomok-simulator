package site.gongnomok.item.dto.request;

import lombok.*;
import site.gongnomok.item.dto.api.ItemRequiredDto;
import site.gongnomok.item.dto.api.ItemRequiredJob;
import site.gongnomok.item.dto.request.ItemStatusRequest;

@NoArgsConstructor
@Getter @Setter
@ToString
public class ItemCreateRequest {

    private Long id;
    private String name;
    private ItemRequiredJob requiredJob;
    private ItemRequiredDto required;
    private String category;
    private ItemStatusRequest status;
    private int upgradableCount;
    private String attackSpeed;
    private int knockBackPercent;

}
