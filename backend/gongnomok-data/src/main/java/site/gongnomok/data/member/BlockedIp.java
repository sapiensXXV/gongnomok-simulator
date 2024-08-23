package site.gongnomok.data.member;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BlockedIp {
    
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blocked_id", nullable = false)
    private Long id;
    
    private String ip;
    private String description;
    
    public BlockedIp(final String ip, final String description) {
        this.ip = ip;
        this.description = description;
    }
    
}
