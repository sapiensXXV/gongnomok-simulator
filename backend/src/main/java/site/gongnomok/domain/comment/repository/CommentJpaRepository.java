package site.gongnomok.domain.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.gongnomok.global.entity.Comment;

public interface CommentJpaRepository extends JpaRepository<Comment, Long> {
}
