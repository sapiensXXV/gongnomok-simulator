package site.gongnomok.data.management.domain;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.data.comment.domain.Comment;


@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class ReportComment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long id;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    private int count;

    // 생성자
    public ReportComment(Comment comment) {
        this.comment = comment;
        this.count = 1;
    }

    public void addCount() {
        count++;
    }

    public static ReportComment from(Comment comment) {
        return new ReportComment(comment);
    }
}
