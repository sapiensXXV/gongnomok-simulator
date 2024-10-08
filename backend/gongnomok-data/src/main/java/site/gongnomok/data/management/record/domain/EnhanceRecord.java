package site.gongnomok.data.management.record.domain;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import site.gongnomok.data.item.domain.Item;

import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@EqualsAndHashCode
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
    
    @Column(name = "ip", nullable = false)
    private String ip;
    
    @Embedded
    private EnhanceRecordSuccess success;
    
    @Embedded
    private EnhanceRecordStatus status;
    
    @CreatedDate
    private LocalDateTime createdAt;
}
