package site.gongnomok.data.log.enahncerecord.domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import site.gongnomok.data.item.domain.Item;

import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Builder
public class EnhanceRecord {
    
    @Id @GeneratedValue(strategy = IDENTITY)
    @Column(name = "enhance_record_id")
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "item_id")
    private Item item;

    @Column(name = "challenger_name", nullable = false)
    private String challengerName;
    
    @Column(name = "tries", nullable = false)
    private int tries;
    
    @Column(name = "score", nullable = false)
    private int score;

    @Column(name = "iev", nullable = false)
    private int iev;
    
    @Column(name = "scroll", nullable = false)
    private String scroll;
    
    @Embedded
    private EnhanceRecordSuccess success;
    
    @Embedded
    private EnhanceRecordStatus status;
    
    @CreatedDate
    private LocalDateTime createdAt;
}
