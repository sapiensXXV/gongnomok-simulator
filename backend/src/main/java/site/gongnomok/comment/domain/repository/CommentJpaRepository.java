package site.gongnomok.comment.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.comment.domain.Comment;

public interface CommentJpaRepository extends JpaRepository<Comment, Long> {
}
