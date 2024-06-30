package site.gongnomok.data.comment.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import site.gongnomok.common.comment.dto.response.CommentDto;
import site.gongnomok.data.item.domain.Item;
import site.gongnomok.data.management.domain.ReportComment;

import java.time.LocalDateTime;

@Entity
@Getter
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Comment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;

    private String name;
    private String password; // 암호화된 패스워드

    private String content;

    @CreatedDate
    private LocalDateTime createdDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    @OneToOne(mappedBy = "comment", fetch = FetchType.LAZY, orphanRemoval = true)
    private ReportComment reportComment;

    private Comment(String name, String password, String content) {
        this.name = name;
        this.password = password;
        this.content = content;
    }

    public static Comment of(
        String name,
        String password,
        String content
    ) {
        return new Comment(name, password, content);
    }

    public void changeItem(Item item) {
        this.item = item;
    }

    public CommentDto toDto() {
        return CommentDto.builder()
            .name(name)
            .commentId(id)
            .createdDate(createdDate)
            .build();
    }

}
