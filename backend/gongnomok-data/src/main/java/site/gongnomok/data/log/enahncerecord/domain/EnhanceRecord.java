package site.gongnomok.data.log.enahncerecord.domain;


import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
public class EnhanceRecord {
    
    @Id @GeneratedValue(strategy = IDENTITY)
    @Column(name = "enhance_record_id")
    private Long id;
    
    @Column(name = "item_id", nullable = false)
    private Long itemId;
    
    @Column(name = "item_name", nullable = false)
    private String itemName;

    @Column(name = "item_name", nullable = false)
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
