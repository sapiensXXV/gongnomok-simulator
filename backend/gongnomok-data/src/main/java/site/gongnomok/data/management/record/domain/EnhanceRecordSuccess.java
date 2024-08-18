package site.gongnomok.data.management.record.domain;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import static lombok.AccessLevel.PROTECTED;

@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
@Builder
@Embeddable
public class EnhanceRecordSuccess {
    
    @Column(nullable = false)
    private int ten;

    @Column(nullable = false)
    private int sixty;

    @Column(nullable = false)
    private int hundred;
    
}
