package site.gongnomok.enhanceditem.domain;


import jakarta.persistence.*;
import lombok.*;
import site.gongnomok.item.domain.Item;
import site.gongnomok.enhanceditem.dto.request.ItemEnhanceRequest;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class EnhancedItem {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enhanced_id")
    private Long id;

    private String name;
    private int score;

    @OneToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @Embedded
    private EnhanceSuccess success;

    @Embedded
    private EnhanceStatus status;

    @Enumerated
    private EnhanceScroll scroll;

    public void changeInfo(ItemEnhanceRequest dto) {
        name = dto.getName();
        score = dto.getScore();
        success = dto.getSuccess().toEntity();
        status = dto.getStatus().toEntity();
    }

    public void changeItem(Item item) {
        this.item = item;
    }
}
