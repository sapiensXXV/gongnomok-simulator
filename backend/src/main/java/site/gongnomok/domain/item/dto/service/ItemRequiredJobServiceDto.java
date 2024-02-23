package site.gongnomok.domain.item.dto.service;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Builder
public class ItemRequiredJobServiceDto {

    private boolean common;
    private boolean warrior;
    private boolean bowman;
    private boolean magician;
    private boolean thief;

}
