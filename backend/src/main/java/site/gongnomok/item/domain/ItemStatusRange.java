package site.gongnomok.item.domain;


import lombok.*;

import static lombok.AccessLevel.PROTECTED;

@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class ItemStatusRange {

    private int lower;
    private int normal;
    private int upper;

}
