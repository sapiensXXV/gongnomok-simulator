package site.gongnomok.domain.item.dto.service;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.domain.item.dto.api.ItemStatusInfoDto;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class ItemStatusServiceDto {

    private ItemStatusInfoServiceDto str;
    private ItemStatusInfoServiceDto dex;
    private ItemStatusInfoServiceDto intel;
    private ItemStatusInfoServiceDto luk;
    private ItemStatusInfoServiceDto phyAtk;
    private ItemStatusInfoServiceDto mgAtk;
    private ItemStatusInfoServiceDto phyDef;
    private ItemStatusInfoServiceDto mgDef;
    private ItemStatusInfoServiceDto hp;
    private ItemStatusInfoServiceDto mp;


}
