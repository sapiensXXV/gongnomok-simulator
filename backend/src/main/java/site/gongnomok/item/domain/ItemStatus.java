package site.gongnomok.item.domain;


import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Embeddable
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class ItemStatus {

    private ItemStatusRange str;
    private ItemStatusRange dex;
    private ItemStatusRange intel;
    private ItemStatusRange luk;
    private ItemStatusRange phyAtk;
    private ItemStatusRange mgAtk;
    private ItemStatusRange phyDef;
    private ItemStatusRange mgDef;
    private ItemStatusRange acc;
    private ItemStatusRange avo;
    private ItemStatusRange move;
    private ItemStatusRange jump;
    private ItemStatusRange hp;
    private ItemStatusRange mp;

}
