package site.gongnomok.common.enhanceditem.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemEnhanceServiceRequest {

    private String name;
    private int upgradable;
    private int iev;
    private String scroll;
    private EnhanceSuccessDto success;
    private EnhanceStatusDto status;

}
