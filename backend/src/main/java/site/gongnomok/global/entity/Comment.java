package site.gongnomok.global.entity;


import jakarta.persistence.*;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Comment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    private String name;
    private String password; // 암호화된 패스워드

    private String content;

    @CreatedDate
    private LocalDateTime createdDate;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

}
