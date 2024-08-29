package site.gongnomok.data.enhanceditem.domain;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import site.gongnomok.common.enhanceditem.dto.EnhancedItemDto;
import site.gongnomok.common.enhanceditem.dto.request.ItemEnhanceServiceRequest;
import site.gongnomok.data.item.domain.Item;

@Entity
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@ToString
@Slf4j
public class EnhancedItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "enhanced_id")
    private Long id;

    private String name;
    private int iev;
    private int score;
    private int tries;
    private String ip;

    @OneToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @Embedded
    private EnhanceSuccess success;

    @Embedded
    private EnhanceStatus status;

    @Enumerated(EnumType.STRING)
    private EnhanceScroll scroll;

    public void changeInfo(ItemEnhanceServiceRequest dto, int newScore, String ipAddress) {
        name = dto.getName();
        iev = dto.getIev();
        score = newScore;
        success = EnhanceSuccess.from(dto.getSuccess());
        scroll = EnhanceScroll.from(dto.getScroll());
        status = EnhanceStatus.from(dto.getStatus());
        tries = dto.getTries();
        ip = ipAddress;
    }

//    public void changeInfo(EnhanceRecord record) {
//        log.info("changeInfo 호출!!");
//        name = record.getChallengerName();
//        iev = record.getIev();
//        score = record.getScore();
//        tries = record.getTries();
//        ip = record.getIp();
//        success = EnhanceSuccess.from(record.getSuccess());
//        scroll = EnhanceScroll.from(record.getScroll());
//        status = EnhanceStatus.from(record.getStatus());
//    }

    public void changeItem(Item item) {
        this.item = item;
    }


    public EnhancedItemDto toDto() {
        return EnhancedItemDto.builder()
            .enhancedId(id)
            .name(name)
            .iev(iev)
            .score(score)
            .success(success.toDto())
            .status(status.toDto())
            .scroll(scroll.name())
            .tries(tries)
            .build();
    }

    public static EnhancedItem from(ItemEnhanceServiceRequest dto, int score, String ipAddress) {
        return EnhancedItem.builder()
            .name(dto.getName())
            .iev(dto.getIev())
            .tries(dto.getTries())
            .score(score)
            .scroll(EnhanceScroll.from(dto.getScroll()))
            .success(EnhanceSuccess.from(dto.getSuccess()))
            .status(EnhanceStatus.from(dto.getStatus()))
            .ip(ipAddress)
            .build();
    }
    
    
    
}
