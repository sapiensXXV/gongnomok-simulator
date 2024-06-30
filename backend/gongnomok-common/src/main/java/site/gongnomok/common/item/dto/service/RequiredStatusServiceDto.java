package site.gongnomok.common.item.dto.service;


import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Builder
public class RequiredStatusServiceDto {
    private int level;
    private int str;
    private int dex;
    private int intel;
    private int luk;
    private int pop;

}
