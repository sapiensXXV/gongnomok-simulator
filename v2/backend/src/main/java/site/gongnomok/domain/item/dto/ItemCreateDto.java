package site.gongnomok.domain.item.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter @Setter
@ToString
public class ItemCreateDto {

    private Long id;
    private String name;
    private ItemRequiredDto required;
    private String category;
    private ItemStatusDto status;
}
